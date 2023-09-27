import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'src/app/models/item';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

  constructor(private authService:AuthService){}

  users: User[] = []
  public isLoading: boolean = true;

  ngOnInit(): void {
    this.loadData()
  }

  public loadData(){
    this.authService.getUsersByRole().subscribe((data)=>{
      this.users = data
    })
    this.isLoading = false;
  }
}
