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

  contactForm!: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.initFrom();
  }

  signIn() {
    this.authService.signIn(this.contactForm.value)
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
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
}
