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
    this.departamentosUnicos = this.obtenerDepartamentosUnicos();

    console.log('user.municipio:', this.user.municipio);
    console.log('filteredMunicipios:', this.filteredMunicipios);

  }

  updateUserData(): void {

    if (!this.user) {
      console.error('Error: No se proporcionaron datos para la actualización.');
      return;
    } console.log('carga de userData:', this.user);

    this.modalUser.updateUser(this.user._id, this.user).subscribe(
      (response) => {
        console.log('Datos act con exito:', response);
        console.log('Datos act usuario con id:', this.user._id);
        console.log('carga de userData:', this.user);
      },
      (error) => {
        console.error('Error al actualizar los datos:', error);
      }
    );
  }
  private obtenerDepartamentosUnicos(): string[] {
    const departamentos: string[] = this.capitalesdata.map(capital => capital.departamento);
    return departamentos.filter((departamento, index, self) => self.indexOf(departamento) === index);

  }

  onDepartamentoChange(selectedDepartamento: string): void {
    // Aquí coloca la lógica para filtrar los municipios según el departamento seleccionado.
    if (selectedDepartamento) {
      this.filteredMunicipios = this.capitalesdata
        .filter(capital => capital.departamento === selectedDepartamento)
        .map(capital => capital.municipio);

      // Asegúrate de que user.municipio sea un valor válido en filteredMunicipios
      if (!this.filteredMunicipios.includes(this.user.municipio.toString())) {
        this.user.municipio = ''; // O cambia esto a otro valor predeterminado válido si es necesario
      }

    } else {
      this.filteredMunicipios = [];
    }
    console.log(selectedDepartamento)
  }

  closeModal() {

    this.modalUser.$modal.emit(false)


  }
}
