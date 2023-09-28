import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  result: string;
  contactForm!: FormGroup;
  public isLoading: boolean = false;
  public errorMessage: string | null = null; // Nuevo campo para el mensaje de error

  constructor(private authService: AuthService,
    private router: Router,
    private readonly fb: FormBuilder) { this.result = ''; }

  ngOnInit(): void {
    this.contactForm = this.initFrom();
  }

  capsLockOn = false;

  checkCapsLock(event: KeyboardEvent) {
    this.capsLockOn = event.getModifierState('CapsLock')
  }

  signIn() {
    this.isLoading = true;
    this.errorMessage = null; // Resetear el mensaje de error

    this.authService.signIn(this.contactForm.value)
      .subscribe(
        (res) => {
          // console.log(res);

          localStorage.setItem('token', res.token);

          const userId = this.authService.getLoggedInUserId();
          const role = this.authService.getLoggedInUserRole();

          // console.log('Role', role)
          // console.log('Logged In User ID:', userId);
          if (userId) {
            this.router.navigate(['/home', userId]);
          } else {
            console.log('No Id found');
          }
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.errorMessage = ' Usuario o contraseña incorrectos'; // Asignar mensaje de error
          this.isLoading = false;
        }
      );
  }

  initFrom(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  //Alert
  showAlert() {
    return this.errorMessage !== null; // Mostrar alerta si hay un mensaje de error
  }
}
