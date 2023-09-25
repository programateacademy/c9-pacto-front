import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';
import { authGuard } from 'src/guard/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { PasswordComponent } from './pages/password/password.component';
import { EmailComponent } from './pages/email/email.component';
import { roleGuard } from 'src/guard/role/role.guard';

const routes: Routes = [

  { path: 'profile/:id', component: ProfileComponent, canActivate:[authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent, canActivate:[authGuard] },
  {path: 'admin/:id', component: AdminComponent},
  {path: 'change-password/:token', component: PasswordComponent},
  {path: 'email', component: EmailComponent},

  // Ruta wildcard para manejar errores 404
  {path:'**', component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
