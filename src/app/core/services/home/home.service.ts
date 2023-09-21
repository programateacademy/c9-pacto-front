import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Home } from 'src/app/models/item';
import { enviroment } from 'src/environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class ForoService {

  private baseURL : string;

  constructor(private http: HttpClient) {
    this.baseURL = enviroment.apiUrl
  }

  getTask(endpoint: string): Observable<Home[]> {
    const url = `${this.baseURL}${endpoint}`;
    return this.http.get<Home[]>(url);
  }

  getUsernameById(userId: string): Observable<string> {
    const url = `${this.baseURL}poofo/${userId}`;
    return this.http.get<string>(url);
  }

  createPost(endpoint: string, item: any): Observable<Home> {
    const url = `${this.baseURL}${endpoint}`;
    return this.http.post<Home>(url, item);
  }
}
