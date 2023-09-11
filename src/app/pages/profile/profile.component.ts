import { Component } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User | null = null;
  users: User[] = [];

  // URL solicitudes
  private URL = ''

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
    private AuthService: AuthService, private http: HttpClient) { }


  // Metodo para obtener todos los usuarios del backend
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);

  }

  // Metodo par aobtener los datos del usuario logeado,
  // teniendo como parametro su Id
  getUser(id: string): Observable<User> {
    const url = `${this.URL}/${id}`;
    console.log('Requesting user data from:', url);
    return this.http.get<User>(url);
  }
}
