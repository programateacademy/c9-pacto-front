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

  constructor(private authService: AuthService, readonly fb: FormBuilder, private router: Router) { }

  contactForm!: FormGroup;
  capitalesdata = capitales;
  names: string = "";
  surNames: string = "";

  departamentosUnicos: string[] = [];
  municipiosUnicos: string[] = [];


  ngOnInit(): void {

    this.contactForm = this.initFrom();
    this.signUp()
    // Lógica para obtener listas de departamentos y municipios únicos
    this.departamentosUnicos = this.obtenerDepartamentosUnicos();
    this.municipiosUnicos = this.obtenerMunicipiosUnicos();
  }


  signUp() {
    this.authService.signUp(this.contactForm.value)
      .subscribe(res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home'])
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
      typEntitySocialActor: [''],
      companyNameOrentity: ['', Validators.required],
      departamentoSelect: ['', Validators.required],
      email: ['', Validators.required],
      surNames: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z\s]+')]],
      gender: ['', Validators.required],
      ethnicity: [''],
      phoneNumber: [''],
      country: ['Colombia'],
      municipioSelect: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      termsAndconditions: [false, Validators.requiredTrue]
    })
  }

  saveForm(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
  }

  //Components para obtener Departamentos, ciudades
  private obtenerDepartamentosUnicos(): string[] {
    const departamentos: string[] = this.capitalesdata.map(capital => capital.departamento);
    return departamentos.filter((departamento, index, self) => self.indexOf(departamento) === index);
  }

  private obtenerMunicipiosUnicos(): string[] {
    const municipios: string[] = this.capitalesdata.map(capital => capital.municipio);
    return municipios.filter((municipio, index, self) => self.indexOf(municipio) === index);
  }

  countryAlert(): void {
    window.alert('En el momento solo estamos en Colombia');
  }

  termsAndconditionsAlert(): void {
    window.alert('')
  }
}
