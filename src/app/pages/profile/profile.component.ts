import { Component } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Home, Comment } from 'src/app/models/item';
import { SwitchUserService } from 'src/app/core/services/modalUs/switch-user.service';
import { forkJoin } from 'rxjs';
import { ForoService } from 'src/app/core/services/home/home.service';
import { InteractionService } from 'src/app/core/services/interactions/interaction.service';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User | null = null;
  users: User[] = [];
  public listpublications: Home[] = [];
  public comments: Comment[] = [];
  likedPublications: { [key: string]: boolean } = {};
  commentContent?: string;
  imageURL: string = '';
  isCommentModalVisible: boolean = false;

  publicationId: string;

  liked: boolean = false;
  constructor(private modalUser: SwitchUserService,
    private router: Router,
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
    private authService: AuthService,
    private interactionService: InteractionService,
    private commentService: CommentsService,
    private foroService: ForoService,
    private renderer: Renderer2) { this.publicationId = ''; }

  isModalVisible !: boolean;

  ngOnInit(): void {

    this.modalUser.$modal.subscribe((valu) => { this.isModalVisible = valu })
    this.loadData();
    this.dataUser();
  }
  showContentOne = true;
  showContentTwo = false;
  toggleContenido() {
    this.showContentOne = !this.showContentOne;
    this.showContentTwo = !this.showContentTwo;
  }
  dataUser() {
    // Obtiene el ID del usuario logueado desde el servicio de autenticación
    const loggedInUserId = this.authService.getLoggedInUserId();
    console.log('loggedInUserId:', loggedInUserId);

    if (loggedInUserId) {
      this.route.paramMap.subscribe(paramMap => {

        // Obtiene el ID de usuario de la URL
        const id = paramMap.get('id');
        console.log('Id Login: ', id)

        // Comprueba si el ID de usuario de la URL coincide con el usuario logueado
        if (id === loggedInUserId) {
          // Obtiene los datos del usuario desde el servicio de perfil
          this.ProfileService.getUser(id).subscribe(data => {
            this.user = data;
            console.log(data)

          });
        } else {
          console.error('Error ids diferentes no coinciden')
          // this.router.navigate(['/error']);
        }
      });
    }
  }


  public loadData() {
    this.foroService.getTask('publictpacto/')
      .subscribe((data: Home[]) => {
        const requests = data.map(publication => this.foroService.getUsernameById(publication.user));
        const userId = this.authService.getLoggedInUserId();
        console.log('Inicio de likePublication', userId);
        forkJoin(requests).subscribe((responses: any[]) => {

          const usernames = responses.map(response => response?.userName);
          const userimgs = responses.map(response => response?.userImg);

          // Filtra las publicaciones para obtener solo las del usuario logeado
          data = data.filter(publication => publication.user === userId);

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

        });
      });
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

  openModal() {

    this.isModalVisible = true
  }
}
