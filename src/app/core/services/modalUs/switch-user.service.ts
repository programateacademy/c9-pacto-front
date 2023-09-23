import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchUserService {

  constructor() { }
  $modal = new EventEmitter<any>();
  userData = new EventEmitter<any>();

  sendUserData(user: any): void {
    // Emitir datos del user al componente modal
    this.userData.emit(user);
    console.log('dataUser switchService: ', user)
  }

}
