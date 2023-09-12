import { Component, Input } from '@angular/core';
import { ForoService } from 'src/app/core/services/home/home.service';
import { InteractionService } from 'src/app/core/services/interactions/interaction.service';
import { Home, Interaction, Comment, User } from 'src/app/models/item';
import { CommentsService } from 'src/app/core/services/comments/comments.service';
import { SwitchService } from 'src/app/core/services/modal/switch.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private foroService: ForoService,
    private interactionService: InteractionService,
    private commentService: CommentsService,
    private modalSS:SwitchService ){}

  @Input() publication: any;
  user: any
  title = 'home';
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
  interactions: {[key: string]: Interaction} = {};




  ngOnInit(): void {

    this.modalSS.$modal.subscribe((valu)=>{this.isModalVisible = valu})

    this.loadData();
  }


  public loadData() {
    this.foroService.getTask('https://pooforoapi.onrender.com/publictpoofo/')
      .subscribe((data: Home[]) => {
        const requests = data.map(publication => this.foroService.getUsernameById(publication.user));

        forkJoin(requests).subscribe((responses: any[]) => {
          const usernames = responses.map(response => response.userName);
          const userimgs = responses.map(responses => responses.userImg )

          this.listpublications = data.map((publication, index) => ({
            ...publication,
            username: usernames[index],
            userimg: userimgs[index]
          }));
          this.isLoading = false;
        });
      });
  }


  //Modal
  openModal(){

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
    if (this.likedPublications[publicationId]) {
      // Ya dio "like", entonces quitar el "like"
      this.interactionService.unlikePublication(publicationId).subscribe(
        (response) => {
          this.likedPublications[publicationId] = false;
        },
        (error) => {
          console.error('Error al quitar like:', error);
        }
      );
    } else {
      // No dio "like", dar el "like"
      this.interactionService.likePublication(publicationId).subscribe(
        (response) => {
          this.likedPublications[publicationId] = true;
        },
        (error) => {
          console.error('Error al dar like:', error);
        }
      );
    }
  }


// Comentarios
openCommentModal(publicationId: string) {
  this.isCommentModalVisible = true;
  this.comments = []; // Limpiar los comentarios actuales antes de cargar nuevos

  this.commentService.getComments(publicationId).subscribe((data: Comment[]) => {
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


  createComment(publicationId: string, user: User) {
    if (user && user._id && typeof user._id === 'string') { // Verifica que user sea válido y tenga una propiedad _id
      const data = {
        content: this.commentContent,
        user: user._id, // Utiliza user._id en lugar de user.id
        publicationId: publicationId
      };

      // Ahora puedes usar la variable 'data' en la llamada a this.commentService.createComment
      this.commentService.createComment(data).subscribe(
        (response) => {
          console.log('Comentario creado', response);
          this.commentService.getComments(publicationId).subscribe((data: Comment[]) => {
            this.comments = data;
          });
        },
        (error) => {
          console.error('Error al crear comentario:', error);
        }
      );
    } else {
      console.error('El objeto user o su propiedad _id no están definidos correctamente.');
    }
  }


  closeCommentModal() {
    this.isCommentModalVisible = false;
  }


}

