import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Home } from 'src/app/models/item';
import { enviroment } from 'src/environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private http: HttpClient) { }

  getTask(url: string): Observable<Home[]> {
    return this.http.get<Home[]>(url);
  }

  getUsernameById(userId: String): Observable<string> {
    const userUrl = enviroment.apiUrl + `poofo/${userId}`
    return this.http.get<string>(userUrl)
  }
}
