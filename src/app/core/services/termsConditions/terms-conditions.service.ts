import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TermsConditionsService {

  constructor() { }

  $modal = new EventEmitter<any>()
}
