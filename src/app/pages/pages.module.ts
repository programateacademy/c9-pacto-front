import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './home/modal/modal.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    HomeComponent,
    ModalComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class PagesModule { }
