import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  email: string = '';
  isEmailValid: boolean = true;
  isEmailSent: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  sendResetPasswordEmail() {
    if (this.validateEmail(this.email)) {
      // El correo es válido, procede a enviarlo
      this.isEmailValid = true;
      this.authService.sendPasswordLink(this.email)
        .subscribe(
          () => {
            this.isEmailSent = true;
            console.log('Enlace de restablecimiento de contraseña enviado con éxito.');
          },
          (error) => {
            console.error('Error al enviar el enlace de restablecimiento de contraseña:', error);
          }
        );
    } else {
      // El correo no es válido, muestra un mensaje de error
      this.isEmailValid = false;
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  cancel() {
    // Redirige al usuario a la página de inicio
    this.router.navigate(['/']);
  }
}
