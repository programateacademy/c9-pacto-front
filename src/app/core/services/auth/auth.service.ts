import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/item';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { enviroment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL solicitudes

  private URL = enviroment.apiUrl


  constructor(private http: HttpClient, private router: Router) { }


  //Logueor, registro & cerrar sesión
  public signUp(user: any) {
    return this.http.post<any>(this.URL + 'admins/signup', user)
  }

  public signIn(user: any) {
    return this.http.post<any>(this.URL + 'admins/signin', user)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  /// Obtener el Id del usuario logeado desde el token almacenado
  getLoggedInUserId(): string | null {
    const token = this.gettoken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

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

  getUsersByRole(): Observable<User[]> {
    return this.http.get<User[]>(this.URL + 'admins/usersByRole');
  }



  getLikesForUser(userId: string): Observable<any> {
    // Obtener el token de autorización del usuario autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      // Manejo de errores: el usuario no está autenticado
      return throwError('Usuario no autenticado');
    }

    // Realizar una solicitud al servidor para obtener los "likes" del usuario
    return this.http.get<any>(`${this.URL}publictpoofo/users/${userId}/likes`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      tap((likes) => {
        console.log('Likes del usuario (recuperados del servidor) authservices:', likes);
      })
    );
  }

}
