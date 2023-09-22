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
  public allPublication: any = []
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

     // Cargar información de "likes" del almacenamiento local
    this.loadLikedPostsFromLocalStorage();

    this.modalSS.$modal.subscribe((valu) => { this.isModalVisible = valu })

    this.loadData();
  }

    // Función para cargar información de "likes" del almacenamiento local
    private loadLikedPostsFromLocalStorage() {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      likedPosts.forEach((publicationId: string) => {
        this.likedPublications[publicationId] = true;
      });
    }

  public loadData() {
    this.foroService.getTask('publictpoofo/')
      .subscribe((data: Home[]) => {
        const requests = data.map(publication => this.foroService.getUsernameById(publication.user));

        forkJoin(requests).subscribe((responses: any[]) => {

          const usernames = responses.map(response => response?.userName);
          const userimgs = responses.map(response => response?.userImg);

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

  //Evento Crear publicacion
  newPostCreating(newPublication:Home){
    this.listpublications.unshift(newPublication)

  }

  //Modal
  openModal() {

    this.isModalVisible = true
  }

  //interactions

  likePublication(publicationId: string) {
    const userId = this.authService.getLoggedInUserId();

    if (!userId) {
      console.error('El usuario no está autenticado');
      return;
    }

    if (this.likedPublications[publicationId]) {
      // Ya dio "like", entonces quitar el "like"
      this.interactionService.unlikePublication(publicationId, userId).subscribe(
        (response) => {
          this.likedPublications[publicationId] = false;
          // Elimina la información del "like" del almacenamiento local
          this.removeFromLocalStorage(publicationId);
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
          // Guarda la información del "like" en el almacenamiento local
          this.saveToLocalStorage(publicationId);
        },
        (error) => {
          console.error('Error al dar like:', error);
        }
      );
    }
  }

  // Función para guardar el "like" en el almacenamiento local
  private saveToLocalStorage(publicationId: string) {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    likedPosts.push(publicationId);
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }

  // Función para quitar el "like" del almacenamiento local
  private removeFromLocalStorage(publicationId: string) {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const index = likedPosts.indexOf(publicationId);
    if (index !== -1) {
      likedPosts.splice(index, 1);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
  }





  // comentarios

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
          data[i].userName = responses[i]?.userName;
          data[i].userAvatar = responses[i]?.userImg;
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
              comments[i].userName = responses[i]?.userName;
              comments[i].userAvatar = responses[i]?.userImg;
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

