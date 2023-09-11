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

  constructor() { }


}
