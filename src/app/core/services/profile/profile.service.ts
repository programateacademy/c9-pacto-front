import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/item';
import { enviroment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private URL = enviroment.apiUrl

  constructor(private http: HttpClient) { }

  // Metodo para obtener todos los usuarios del backend
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  // Metodo par aobtener los datos del usuario logeado por su ID
  getUser(id: string): Observable<User> {
    const url = `${this.URL}users/${id}`;
    console.log('Requesting user data from:', url);
    return this.http.get<User>(url);
  }

  // Función para eliminar una publicación por su ID
  deletePublication(publicationId: string, token: string): Observable<any> {
    const url = `${this.URL}publictpacto/delete/${publicationId}`;
    const headers = { 'Authorization': `Bearer ${token}` };

    console.log('token desde deleteService', headers)
    console.log('id from Service profile', publicationId)

    return this.http.delete(url, { headers });
  }
}
