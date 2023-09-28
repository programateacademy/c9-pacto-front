import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SwitchUserService {
  private URL = enviroment.apiUrl

  constructor(private http: HttpClient) { }
  $modal = new EventEmitter<any>();
  userData = new EventEmitter<any>();

  sendUserData(user: any): void {
    // Emitir datos del user al componente modal
    this.userData.emit(user);
    // console.log('dataUser switchService: ', user)
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.URL}users/update/${userId}`;
    // console.log('userData switchUser', userData)
    return this.http.put(url, userData);
  }

}
