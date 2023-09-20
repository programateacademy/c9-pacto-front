import { Component, Input } from '@angular/core';
import { ForoService } from 'src/app/core/services/home/home.service';
import { InteractionService } from 'src/app/core/services/interactions/interaction.service';
import { Home, Interaction, Comment, User } from 'src/app/models/item';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { SwitchService } from 'src/app/core/services/modal/switch.service';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private foroService: ForoService,
    private interactionService: InteractionService,
    private commentService: CommentsService,
    private modalSS: SwitchService,
    private authService: AuthService,
    private renderer: Renderer2) {
    const userId = this.authService.getLoggedInUserId();
    if (userId !== null) {
      this.userId = userId;
    } else {
      console.error('El ID de usuario no está disponible.');
    }
    this.publicationId = '';
  }

  @Input() publication: any;
  user: any
  title = 'home';
  userId: string | undefined;
  publicationId: string;
  //user: any = []

  //Data Homr
  public listpublications: Home[] = [];
  public comments: Comment[] = [];

  public isLoading: boolean = true;
  commentContent?: string;
  imageURL: string = '';
  isModalVisible !: boolean;
  isCommentModalVisible: boolean = false;

  likedPublications: { [key: string]: boolean } = {};
  interactions: { [key: string]: Interaction } = {};

  liked: boolean = false;


  ngOnInit(): void {

    this.modalSS.$modal.subscribe((valu) => { this.isModalVisible = valu })

    // Recupera los likes almacenados en localStorage y asígnalos a this.likedPublications
    // const userLikesFromLocalStorage = localStorage.getItem('userLikes');
    // if (userLikesFromLocalStorage) {
    //   this.likedPublications = JSON.parse(userLikesFromLocalStorage);
    //   console.log('Likes del usuario (recuperados de localStorage):', this.likedPublications);
    // }
    this.loadData();
  }

  public loadData() {
    this.foroService.getTask('https://pooforoapi.onrender.com/publictpoofo/')
      .subscribe((data: Home[]) => {
        const requests = data.map(publication => this.foroService.getUsernameById(publication.user));

        forkJoin(requests).subscribe((responses: any[]) => {
          const usernames = responses.map(response => response.userName);
          const userimgs = responses.map(response => response.userImg);

          // Map the likes information
          const likes = data.map(publication => {
            return {
              publicationId: publication._id,
              likedBy: publication.likes
            };
          });

          this.listpublications = data.map((publication, index) => ({
            ...publication,
            username: usernames[index],
            userimg: userimgs[index],
            liked: this.likedPublications[publication._id] === true,
            likes: likes.find(like => like.publicationId === publication._id)?.likedBy || []
          })); console.log('Likes por publicaicon', likes)
          this.isLoading = false;
        });
      });
  }


  //Modal
  openModal() {

    this.isModalVisible = true
  }


  // Simulacion para publicaciones
  postText: string = '';

  public publishPost() {
    // Lógica para publicar la entrada aquí
    console.log('Publicar entrada:', this.postText);
  }


  //interactions

  likePublication(publicationId: string) {
    localStorage.setItem('userLikes', JSON.stringify(this.likedPublications));

    const userId = this.authService.getLoggedInUserId();
    console.log('Inicio de likePublication. publicationId:', publicationId, 'userId:', userId);

    if (!userId) {
      // El usuario no está autenticado, maneja el caso en consecuencia
      console.error('El usuario no está autenticado');
      return;
    }
    const hasLiked = this.likedPublications[publicationId];

    if (hasLiked) {
      // Ya dio "like", entonces quitar el "like"
      this.interactionService.unlikePublication(publicationId, userId).subscribe(
        (response) => {
          this.likedPublications[publicationId] = false;
          console.log('likedPublications después de quitar like:', this.likedPublications);
        },
        (error) => {
          console.error('Error al quitar like:', error);
        }
      );
    } else {
      // No dio "like", dar el "like"
      this.interactionService.likePublication(publicationId, userId).subscribe(
        (response) => {
          this.likedPublications[publicationId] = true;
        },
        (error) => {
          console.error('Error al dar like:', error);
          console.log('likedPublications después de dar like:', this.likedPublications);
        }
      );
    }
  }

  setPublicationIdAndOpenModal(publicationId: string) {
    this.publicationId = publicationId;
    this.openCommentModal();
  }


  // Comentarios
  openCommentModal() {
    console.log(this.publicationId)
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.isCommentModalVisible = true;
    this.comments = []; // Limpiar los comentarios actuales antes de cargar nuevos

    this.commentService.getComments(this.publicationId).subscribe((data: Comment[]) => {
      const commentRequests = data.map(comment => this.foroService.getUsernameById(comment.user));

      forkJoin(commentRequests).subscribe((responses: any[]) => {
        for (let i = 0; i < data.length; i++) {
          data[i].userName = responses[i].userName;
          data[i].userAvatar = responses[i].userImg;
        }
        this.comments = data; // Almacenar los comentarios solo para la publicación actual
      });
    });
  }


  createComment() {
    const userId = this.authService.getLoggedInUserId();
    const data = {
      content: this.commentContent,
      userId: userId,
      publicationId: this.publicationId
    };

    console.log(this.commentContent);
    console.log(userId);
    console.log(this.publicationId);

    // Crear el comentario
    this.commentService.createComment(data).subscribe(
      (response) => {
        console.log('Comentario creado', response);

        // Después de crear el comentario, obtén la lista actualizada de comentarios
        this.commentService.getComments(this.publicationId).subscribe((comments: Comment[]) => {
          const commentRequests = comments.map(comment => this.foroService.getUsernameById(comment.user));

          forkJoin(commentRequests).subscribe((responses: any[]) => {
            for (let i = 0; i < comments.length; i++) {
              comments[i].userName = responses[i].userName;
              comments[i].userAvatar = responses[i].userImg;
            }
            this.comments = comments; // Actualizar la lista de comentarios
          });
        });
      },
      (error) => {
        console.error('Error al crear comentario:', error);
      }
    );
  }


  closeCommentModal() {
    this.renderer.removeStyle(document.body, 'overflow');
    this.isCommentModalVisible = false;
  }


}

