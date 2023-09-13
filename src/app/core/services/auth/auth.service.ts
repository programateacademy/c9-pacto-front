import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL solicitudes
  private URL = 'https://pooforoapi.onrender.com/admins'

  constructor(private http: HttpClient, private router: Router) { }


  //Logueor, registro & cerrar sesión
  public signUp(user:any) {
    return this.http.post<any>(this.URL + '/signup',user)
  }

  public signIn(user:any){
    return this.http.post<any>(this.URL + '/signin',user)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  /// Obtener el Id del usuario logeado desde el token almacenado
  getLoggedInUserId(): string | null {
    const token = this.gettoken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Valor id deccodificado: ', payload.id)
      if (payload.id) {
        return payload.id;
      }

    }
    return null;
  }

  // Almacena el token
  gettoken() {
    return localStorage.getItem('token')
  }
}
