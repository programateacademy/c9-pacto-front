import { Component, Input } from '@angular/core';
import { SwitchUserService } from '../../services/modalUs/switch-user.service';
import { User } from 'src/app/models/item';
import { capitales } from '../../services/formulario/capitales';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  contactForm!: FormGroup;


  constructor(private modalUser: SwitchUserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.initFrom();
    this.departamentosUnicos = this.obtenerDepartamentosUnicos();

    console.log('user.municipio:', this.user.municipio);
    console.log('filteredMunicipios:', this.filteredMunicipios);

    this.contactForm.patchValue(this.user);
  }

  defaultUserImgUrl = '../../../assets/img/perfil.png';
  initFrom(): FormGroup {
    return this.fb.group({
      names: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z\\s]+')]],
      surNames: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z\\s]+')]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      years: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      person: ['', Validators.required],
      typEntitySocialActor: ['', Validators.required],
      companyNameOrentity: ['', Validators.required],
      departamento: ['', Validators.required],
      gender: ['', Validators.required],
      ethnicity: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      country: ['Colombia'],
      municipio: ['', Validators.required],
      termsAndconditions: [false, Validators.pattern('true')],
      descriptionUser: ['', Validators.required, Validators.maxLength(25)],
      interests:['', Validators.required, Validators.maxLength(35)]
      // userImg: [this.defaultUserImgUrl]
    })
  }


  updateUserData(): void {

    if (!this.user) {
      console.error('Error: No se proporcionaron datos para la actualización.');
      return;
    } console.log('carga de userData:', this.user);

    this.user = { ...this.user, ...this.contactForm.value };

    this.modalUser.updateUser(this.user._id, this.user).subscribe(
      (response) => {
        this.closeModalAndReloadPage();
        console.log('Datos act con exito:', response);
        console.log('Datos act usuario con id:', this.user._id);
        console.log('carga de userData:', this.user);
      },
      (error) => {
        console.error('Error al actualizar los datos:', error);
      }
    );
  }

  closeModalAndReloadPage() {
    this.closeModal();
    window.location.reload();
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
