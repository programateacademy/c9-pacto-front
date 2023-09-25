import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { capitales } from '../../core/services/formulario/capitales';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TermsConditionsService } from 'src/app/core/services/termsConditions/terms-conditions.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private modalTers: TermsConditionsService
  ) { }

  contactForm!: FormGroup;
  capitalesdata = capitales;
  showModal !: boolean;


  departamentosUnicos: string[] = [];
  filteredMunicipios: string[] = [];


  ngOnInit(): void {
    this.contactForm = this.initFrom();
    this.modalTers.$modal.subscribe((value) => {this.showModal = value})

    // Lógica para obtener listas de departamentos y municipios únicos
    this.departamentosUnicos = this.obtenerDepartamentosUnicos();
  }

  openModal(){
    this.showModal = true
  }


  onSubmit(): void {
    console.log('form ->', this.contactForm.value);
    if (this.contactForm.valid) {
      this.signUp();
    }
  }


  // Var para guardar y manejar el error
  errorResponseMessage: string | null = null;

  // Metodo para manejar el registro del usuario
  signUp() {
    this.authService.signUp(this.contactForm.value)
      .subscribe(res => {
        console.log(res)
        localStorage.setItem('token', res.token)

        // Obtiene el ID del usuario logueado.
        const userId = this.authService.getLoggedInUserId();
        // Redirige al perfil del usuario si los IDs coinciden.
        if (userId) {
          this.router.navigate(['/home', userId]);
        } else {
          console.log('No se encontro id')
        }
      },
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            this.errorResponseMessage = err.error.message;
          }
        }
      );
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
      userImg: [this.defaultUserImgUrl]
    })

  }

  saveForm(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
  }

  // Componentes para obtener Departamentos, municipios
  private obtenerDepartamentosUnicos(): string[] {
    const departamentos: string[] = this.capitalesdata.map(capital => capital.departamento);
    return departamentos.filter((departamento, index, self) => self.indexOf(departamento) === index);
  }

  onDepartamentoChange(): void {
    const selectedDepartamento = this.contactForm.get('departamento')?.value;
    if (selectedDepartamento) {
      this.filteredMunicipios = this.capitalesdata
        .filter(capital => capital.departamento === selectedDepartamento)
        .map(capital => capital.municipio);
    } else {
      this.filteredMunicipios = [];
    }
  }

  countryAlert(): void {
    window.alert('En el momento solo estamos en Colombia');
  }

  formRegisterAlert(): void {
    window.alert('Todos los campos con * son obligatorios')
  }

}
