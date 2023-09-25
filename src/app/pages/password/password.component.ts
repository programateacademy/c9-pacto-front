import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  passwordForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      const newPassword = this.passwordForm.value.newPassword;
      const confirmPassword = this.passwordForm.value.confirmPassword;

      if (newPassword === confirmPassword) {
        this.authService.changePassword(newPassword)
          .subscribe(
            (response) => {
              // Manejar la respuesta exitosa aquí si es necesario
              console.log('Contraseña actualizada con éxito', response);

              // Luego, puedes borrar los campos de contraseña
              this.passwordForm.reset();
              this.passwordMismatch = false; // Restablecer la bandera de contraseña no coincidente
            },
            (error) => {
              // Manejar el error aquí si es necesario
              console.error('Error al actualizar la contraseña', error);
            }
          );
      } else {
        // Las contraseñas no coinciden, mostrar advertencia
        this.passwordMismatch = true;
      }
    }
  }
}
