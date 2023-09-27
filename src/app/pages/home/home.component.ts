import { Component, ElementRef, Input } from '@angular/core';
import { ForoService } from 'src/app/core/services/home/home.service';
import { InteractionService } from 'src/app/core/services/interactions/interaction.service';
import { Home, Comment, User } from 'src/app/models/item';
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
  constructor(
    private foroService: ForoService,
    private interactionService: InteractionService,
    private commentService: CommentsService,
    private modalSS: SwitchService,
    private authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    const userId = this.authService.getLoggedInUserId();
    if (userId !== null) {
      this.userId = userId;
    } else {
      console.error('El ID de usuario no está disponible.');
    }
    this.publicationId = '';
  }

  @Input() publication: any;
  user: any;
  title = 'home';
  userId: string | undefined;
  publicationId: string;
  public allPublication: any = [];
  public listpublications: Home[] = [];
  public comments: Comment[] = [];

  public isLoading: boolean = true;
  commentContent?: string;
  imageURL: string = '';
  isModalVisible!: boolean;
  isCommentModalVisible: boolean = false;
  isCommentPosted: boolean = false; // Agregar esta variable

  likedByUser(publicationId: string): boolean {
    return !!this.userId && !!this.likedPublications[this.userId] && this.likedPublications[this.userId][publicationId] === true;
  }

  likedPublications: { [userId: string]: { [publicationId: string]: boolean } } = {};

  ngOnInit(): void {
    this.modalSS.$modal.subscribe((value) => {
      this.isModalVisible = value;
    });
    this.initializeUserLikes();
    this.loadUserData();
    this.loadData();
  }

  loadUserData() {
    const userId = this.authService.getLoggedInUserId();
    if (userId) {
      this.authService.getUserById(userId).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    }
  }

  initializeUserLikes() {
    this.userId = this.authService.getLoggedInUserId() || '';

    if (this.userId) {
      const userLikesKey = `userLikes_${this.userId}`;
      const userLikes = JSON.parse(localStorage.getItem(userLikesKey) || '{}');

      this.likedPublications[this.userId] = userLikes;
    }
  }

  public loadData() {
    this.foroService.getTask('publictpacto/').subscribe((data: Home[]) => {
      const requests = data.map(publication => this.foroService.getUsernameById(publication.user));

      forkJoin(requests).subscribe((responses: any[]) => {
        const usernames = responses.map(response => response?.userName);
        const userimgs = responses.map(response => response?.userImg);

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
          likedByUser: this.userId ? !!this.likedPublications[this.userId]?.[publication._id] : false
        }));

        console.log('Likes por publicación', likes);
      });
    });
  }

  newPostCreating(newPublication: Home) {
    this.listpublications.unshift(newPublication);
  }

  openModal() {
    this.isModalVisible = true;
  }

  likePublication(publicationId: string) {
    const userId = this.authService.getLoggedInUserId();

    if (!userId) {
      console.error('El usuario no está autenticado');
      return;
    }

    if (!this.userId) {
      console.error('El ID de usuario no está disponible');
      return;
    }

    const likedByUser = this.likedPublications[userId] && this.likedPublications[userId][publicationId] === true;

    if (likedByUser) {
      this.interactionService.unlikePublication(publicationId, userId).subscribe(
        (response) => {
          this.likedPublications[userId][publicationId] = false;
          this.removeFromLocalStorage(userId, publicationId);
        },
        (error) => {
          console.error('Error al quitar like:', error);
        }
      );
    } else {
      this.interactionService.likePublication(publicationId, userId).subscribe(
        (response) => {
          this.likedPublications[userId][publicationId] = true;
          this.saveToLocalStorage(userId, publicationId);
        },
        (error) => {
          console.error('Error al dar like:', error);
        }
      );
    }
  }

  private saveToLocalStorage(userId: string, publicationId: string) {
    if (!userId) return;

    if (!this.likedPublications[userId]) {
      this.likedPublications[userId] = {};
    }

    this.likedPublications[userId][publicationId] = true;

    localStorage.setItem(`userLikes_${userId}`, JSON.stringify(this.likedPublications[userId]));
  }

  private removeFromLocalStorage(userId: string, publicationId: string) {
    if (!userId || !this.likedPublications[userId]) return;

    delete this.likedPublications[userId][publicationId];

    localStorage.setItem(`userLikes_${userId}`, JSON.stringify(this.likedPublications[userId]));
  }

  setPublicationIdAndOpenModal(publicationId: string) {
    this.publicationId = publicationId;
    this.openCommentModal();
  }

  openCommentModal() {

    console.log(this.publicationId);
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.isCommentModalVisible = true;
    this.comments = [];

    this.commentService.getComments(this.publicationId).subscribe((data: Comment[]) => {
      const commentRequests = data.map(comment => this.foroService.getUsernameById(comment.user));

      forkJoin(commentRequests).subscribe((responses: any[]) => {
        for (let i = 0; i < data.length; i++) {
          data[i].userName = responses[i]?.userName;
          data[i].userAvatar = responses[i]?.userImg;
        }
        this.comments = data;
      });
    });
    this.isLoading = false
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

    this.commentService.createComment(data).subscribe(
      (response) => {
        console.log('Comentario creado', response);

        this.isCommentPosted = true; // Mostrar el mensaje
        setTimeout(() => {
          this.isCommentPosted = false; // Ocultar el mensaje después de 5 segundos (ajusta el tiempo según tus necesidades)
        }, 3000);

        this.commentService.getComments(this.publicationId).subscribe((comments: Comment[]) => {
          const commentRequests = comments.map(comment => this.foroService.getUsernameById(comment.user));

          forkJoin(commentRequests).subscribe((responses: any[]) => {
            for (let i = 0; i < comments.length; i++) {
              comments[i].userName = responses[i]?.userName;
              comments[i].userAvatar = responses[i]?.userImg;
            }
            this.comments = comments;
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
