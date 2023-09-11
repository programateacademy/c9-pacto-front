import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/item';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // URL de la API para obtener datos de usuarios
  private URL = ''

  constructor(private http: HttpClient,
    private router: Router) { }
}
