import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/models/item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private authService:AuthService){}

  users: User[] = []

  ngOnInit(): void {
    this.loadData()
  }

  public loadData(){
    this.authService.getUsersByRole().subscribe((data)=>{
      this.users = data
    })
  }
}
