import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL solicitudes
  private URL = ''

  constructor(private http: HttpClient, private router: Router) { }
}
