import { Component, Input, Renderer2 } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User, Home } from 'src/app/models/item';
import { SwitchUserService } from 'src/app/core/services/modalUs/switch-user.service';
import { forkJoin } from 'rxjs';
import { ForoService } from 'src/app/core/services/home/home.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() user: User | null = null;
  userName = '';
  newUserName = '';
  userImg = '';
  newUserImg = '';
  users: User[] = [];
  public listpublications: Home[] = [];
  publicationId: string;
  isModalVisible!: boolean;
  public isLoadingUs: boolean = true;

  isEditingName = false;
  isEditingImg = false;


  constructor(private modalUser: SwitchUserService,
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
    private authService: AuthService,
    private foroService: ForoService,
    private renderer: Renderer2) { this.publicationId = ''; }


  ngOnInit(): void {
    this.modalUser.$modal.subscribe((valu) => { this.isModalVisible = valu })
    this.loadData();
    this.dataUser();
    this.checkUserNameLength();
    this.extractYouTubeLinks();
  }

  showContentOne = true;
  showContentTwo = false;
  toggleContenido() {
    this.showContentOne = !this.showContentOne;
    this.showContentTwo = !this.showContentTwo;
  }

  showOptions = false;
  toggleOptions(publication: any) {
    publication.showOptions = !publication.showOptions;
    this.publicationId = publication._id;
    // console.log('id from S options', this.publicationId)
  }

  isUserNameLong: boolean = false; // Nueva propiedad para determinar si el nombre supera los 10 caracteres
  checkUserNameLength() {
    if (this.user && this.user.userName) {
      this.isUserNameLong = this.user.userName.length > 10;
    }
  }
  dataUser() {
    // Obtiene el ID del usuario logueado desde el servicio de autenticación
    const loggedInUserId = this.authService.getLoggedInUserId();
    // console.log('loggedInUserId:', loggedInUserId);

    if (loggedInUserId) {
      this.route.paramMap.subscribe(paramMap => {

        // Obtiene el ID de usuario de la URL
        const id = paramMap.get('id');
        // console.log('Id Login: ', id)

        // Comprueba si el ID de usuario de la URL coincide con el usuario logueado
        if (id === loggedInUserId) {
          this.ProfileService.getUser(id).subscribe(data => {
            this.user = data;
            // console.log('Data User prfile', data)
          });
        } else {
          console.error('Error ids diferentes no coinciden')
          // this.router.navigate(['/error']);
        }
      });
    }
    this.isLoadingUs = false
  }

  // Función para actualizar el nombre de usuario
  updateUserImg() {
    if (!this.user) {
      console.error('Error: No se proporcionaron datos para la actualización.');
      return;
    }
    const updatedData = {
      userImg: this.newUserImg
    };
    // Realizar la solicitud al servidor
    this.modalUser.updateUser(this.user._id, updatedData).subscribe(
      (response) => {
        // console.log('Nombre de usuario actualizado con éxito:', response);
        if (this.user) {
          this.user.userImg = this.newUserImg;
        }
      },
      (error) => {
        console.error('Error al actualizar el nombre de usuario:', error);
      }
    );
    this.isEditingImg = false;
  }

  cancelEditImg() {
    this.newUserImg = this.userImg;
    this.isEditingImg = false;
  }

  // Función para actualizar el nombre de usuario
  updateUserName() {
    if (!this.user) {
      console.error('Error: No se proporcionaron datos para la actualización.');
      return;
    }
    const updatedData = {
      userName: this.newUserName
    };
    // Realizar la solicitud al servidor
    this.modalUser.updateUser(this.user._id, updatedData).subscribe(
      (response) => {
        // console.log('Nombre de usuario actualizado con éxito:', response);
        if (this.user) {
          this.user.userName = this.newUserName;
        }
      },
      (error) => {
        console.error('Error al actualizar el nombre de usuario:', error);
      }
    );
    this.isEditingName = false;
  }

  // Función para cancelar la edición
  cancelEditName() {
    this.newUserName = this.userName;
    this.isEditingName = false;
  }


  public loadData() {
    const userId = this.authService.getLoggedInUserId(); // Obtiene el ID del usuario logeado

    if (userId) {
      this.foroService.getPubUserId(userId) // Pasa el userId como argumento
        .subscribe((data: Home[]) => {
          const requests = data.map(publication => this.foroService.getUsernameById(publication.user));

          forkJoin(requests).subscribe((responses: any[]) => {
            const usernames = responses.map(response => response?.userName);
            const userimgs = responses.map(response => response?.userImg);

            // Filtra las publicaciones para obtener solo las del usuario logeado
            data = data.filter(publication => publication.user === userId);

            this.listpublications = data.map((publication, index) => ({
              ...publication,
              username: usernames[index],
              userimg: userimgs[index],
            }));
            // console.log('Data Publi prfile', data);
            this.extractYouTubeLinks();
          });
        });
    } else {
      console.error("El ID de usuario es nulo."); // Maneja el caso en que userId es nulo
    }
  }


  extractYouTubeLinks() {
    // console.log('Iniciando extractYouTubeLinks()');

    this.listpublications.forEach((publication) => {
      // console.log('Procesando publicación:', publication);

      const youtubeRegex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
      const match = publication.description.match(youtubeRegex);

      if (match) {
        // Se encontró una URL de YouTube en la descripción
        publication.youtubeLink = match[0];
        const videoID = match[1];
        publication.youtubeThumbnail = `https://img.youtube.com/vi/${videoID}/0.jpg`;
      }
    });
  }


  formatText(text: string): { textParts: string[], youtubeLinks: string[] } {
    const textParts: string[] = [];
    const youtubeLinks: string[] = [];
    const youtubeRegex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:&[a-zA-Z0-9_-]+=[^&]*)*/g;
    let match;

    while ((match = youtubeRegex.exec(text)) !== null) {
      // Agregar el texto antes de la URL de YouTube
      textParts.push(text.substring(0, match.index));
      // Agregar la URL de YouTube
      youtubeLinks.push(match[0]);
      // Actualizar el texto restante
      text = text.substring(match.index + match[0].length);
    }

    // Agregar el texto restante después de la última URL de YouTube
    textParts.push(text);

    return { textParts, youtubeLinks };
  }


  // Función para eliminar una publicación
  onDeletePublication(publicationId: string) {
    const token = this.authService.gettoken();
    // console.log('Token from delete profileC', token);
    if (!token) {
      console.error('Token de autenticación no encontrado.');
      return;
    }

    this.ProfileService.deletePublication(publicationId, token).subscribe(
      (response) => {
        // console.log('Publicación eliminada exitosamente', response);
        this.loadData();
      },
      (error) => {
        console.error('Error al eliminar la publicación', error);
      }
    );
  }

  openModal(user: User | null): void {
    if (user) {
      this.isModalVisible = true
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
      this.modalUser.sendUserData(user);
      // console.log('dataUser profileComp: ', user)
    }
  }

}

