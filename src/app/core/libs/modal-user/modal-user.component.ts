import { Component, Input } from '@angular/core';
import { SwitchUserService } from '../../services/modalUs/switch-user.service';
import { User } from 'src/app/models/item';
import { capitales } from '../../services/formulario/capitales';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent {
  @Input() user: User = {} as User;
  departamentosUnicos: string[] = [];
  filteredMunicipios: string[] = [];
  capitalesdata = capitales;

  constructor(private modalUser: SwitchUserService) { }

  ngOnInit(): void {
    // recibe datos del componente padre
    this.modalUser.userData.subscribe((userData: User) => {
      // Actualizar los datos del usuario en el modal
      this.user = userData;
      console.log('data user ModalUser: ', userData)
    });

  }

  closeModal() {

    this.modalUser.$modal.emit(false)


  }
}
