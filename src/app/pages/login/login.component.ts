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
  showAlertMessage: boolean = false;
  public isLoading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private readonly fb: FormBuilder) { this.result = ''; }

  ngOnInit(): void {
    this.contactForm = this.initFrom();
  }


  signIn() {
    this.isLoading = true; // Agregar isLoading para mostrar el loader
    this.authService.signIn(this.contactForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);

          const userId = this.authService.getLoggedInUserId();

          // Realiza una solicitud para obtener los "likes" y almacénalos en localStorage
          // if (userId !== null) {
          //   this.authService.getLikesForUser(userId).subscribe((likes) => {
          //     localStorage.setItem('userLikes', JSON.stringify(likes));
          //     console.log(likes)
          //   });
          // }

          console.log('Logged In User ID:', userId);
          if (userId) {
            this.router.navigate(['/home', userId]);
          } else {
            console.log('No Id found');
          }
          this.isLoading = false; // Establecer isLoading en falso cuando se complete la solicitud
        },
        (err) => {
          console.log(err);
          this.showAlertMessage = true; // Mostrar el mensaje de error solo cuando los datos son incorrectos
          this.isLoading = false; // Establecer isLoading en falso cuando se complete la solicitud
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
    this.showAlertMessage = true;
  }
}
