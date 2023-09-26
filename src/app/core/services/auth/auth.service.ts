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




  // Eliminar un usuario por su ID
  deleteUser(_id: string): Observable<User> {
    return this.http.delete<User>(`${this.URL}users/delete/${_id}`);
  }


  //Logueor, registro & cerrar sesión
  public signUp(user: any) {
    return this.http.post<any>(this.URL + 'admins/signup', user)
  }

  public signIn(user: any) {
    return this.http.post<any>(this.URL + 'admins/signin', user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token)
      })
    )
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

  getUserById(userId: string): Observable<User> {
    // Realiza una solicitud al servidor para obtener la información del usuario por su ID
    return this.http.get<User>(`${this.URL}users/${userId}`);
  }

  //Obetener rol del usuario
  getLoggedInUserRole(): string {
    const token = this.gettoken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.role) {
        // Suponemos que solo hay un objeto en el arreglo "admin"
        return payload.role;
      }
    }
    return this.getLoggedInUserRole();
  }

  //bolean rol
  //validar roles
  isAdmin(): boolean {
    const userRoleArray = this.getLoggedInUserRole();
    console.log('rol del usuario', userRoleArray)
    return Array.isArray(userRoleArray) && userRoleArray.length > 0 &&
      userRoleArray[0].name.toLowerCase() === 'admin';
    // return userRoleArray === 'admin';
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
    return this.http.get<any>(`${this.URL}publictpacto/users/${userId}/likes`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      tap((likes) => {
        console.log('Likes del usuario (recuperados del servidor) authservices:', likes);
      })
    );
  }


  sendPasswordLink(email: string,): Observable<any> {
    const sendPasswordLinkUrl = `${this.URL}admins/send-password-link`;

    const requestBody = {
      email: email
    };


    return this.http.post(sendPasswordLinkUrl, requestBody,);
  }


  private getHttpOptions(token: string): { headers: HttpHeaders } {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token, // Agrega el token al encabezado
      }),
    };

    return httpOptions;
  }
  changePassword(password: string, token: string): Observable<any> {
    const url = `${this.URL}admins/change-password`;

    const httpOptions = this.getHttpOptions(token);

    const requestBody = {
      password: password,
    };

    return this.http.post(url, requestBody, httpOptions);
  }
}
