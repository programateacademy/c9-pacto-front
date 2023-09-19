import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/formulario/api.service';
import { capitales } from '../../core/services/formulario/capitales';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  contactForm!: FormGroup;
  capitalesdata = capitales;


  departamentosUnicos: string[] = [];
  filteredMunicipios: string[] = [];

  ngOnInit(): void {
    this.contactForm = this.initFrom();

    // Lógica para obtener listas de departamentos y municipios únicos
    this.departamentosUnicos = this.obtenerDepartamentosUnicos();
  }


  signUp() {
    this.authService.signUp(this.contactForm.value)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        err => console.log(err)
      )
  }

  onSubmit(): void {
    console.log('form ->', this.contactForm.value);
  }

  initFrom(): FormGroup {
    return this.fb.group({
      names: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z\s]+')]],

      years: ['', [Validators.required, Validators.minLength(2)]],
      person: ['', Validators.required],
      typEntitySocialActor: ['',Validators.required],
      companyNameOrentity: ['', Validators.required],
      departamento: ['', Validators.required],
      email: ['', Validators.required],
      surNames: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z\s]+')]],
      gender: ['', Validators.required],
      ethnicity: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      country: ['Colombia'],
      municipio: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      termsAndconditions: [false, Validators.pattern('true')]
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
