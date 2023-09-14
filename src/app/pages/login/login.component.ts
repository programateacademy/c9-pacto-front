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

  constructor(private authService: AuthService,
    private router: Router,
    private readonly fb: FormBuilder) { this.result = ''; }

  ngOnInit(): void {
    this.contactForm = this.initFrom();
  }

  signIn() {
    this.authService.signIn(this.contactForm.value)
      .subscribe(res => {
        console.log(res)
        localStorage.setItem('token', res.token)

        const userId = this.authService.getLoggedInUserId();
        console.log('Logged In User ID:', userId);
        if (userId) {
          this.router.navigate(['/home', userId]);
        } else {
          console.log('No Id found')
        }
      },
        err => console.log(err)
      )
  }

  onSubmit(): void {
    console.log('form ->', this.contactForm.value);

    if (this.contactForm.value) {
      this.result = 'User or password does not exist';
    }
  }

  initFrom(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  //Alert
  showAlert() {
    const title = 'Aviso';
    const message = ' El usuario o contraseña no existe.';
    window.alert(`${title}: ${message}`);
    this.result = '';
  }
}
