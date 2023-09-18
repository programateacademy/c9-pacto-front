import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchUserService {

  constructor() { }
  $modal = new EventEmitter<any>()
}
