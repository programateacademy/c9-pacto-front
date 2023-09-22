import { Component } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Home } from 'src/app/models/item';
import { SwitchUserService } from 'src/app/core/services/modalUs/switch-user.service';
import { forkJoin } from 'rxjs';
import { ForoService } from 'src/app/core/services/home/home.service';
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
  imageURL: string = '';
  publicationId: string;
  isModalVisible !: boolean;

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
  }

  showContentOne = true;
  showContentTwo = false;
  toggleContenido() {
    this.showContentOne = !this.showContentOne;
    this.showContentTwo = !this.showContentTwo;
  }

  showOptions = false;
  toggleOptions() {
    this.showOptions = !this.showOptions;

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
            console.log('Data User prfile', data)
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
          console.log('Data Publi prfile', data)
        });
      });
  }

  openModal() {
    this.isModalVisible = true
  }
}
