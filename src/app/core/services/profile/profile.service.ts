import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/item';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private URL = ''

  constructor(private http: HttpClient,
    private router: Router) { }

  // Metodo para obtener todos los usuarios del backend
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);

  }

  // Metodo par aobtener los datos del usuario logeado por su ID
  getUser(id: string): Observable<User> {
    const url = `${this.URL}/${id}`;
    console.log('Requesting user data from:', url);
    return this.http.get<User>(url);
  }
}
