import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/models/item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public isModalOpen: boolean = false;
  public selectedUser: any = null;
  public users: any[] = [];
  public showDeleteConfirmation: boolean = false;

  constructor(private authService: AuthService) { }



  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.authService.getUsersByRole().subscribe((data) => {
      this.users = data;
    });
  }

  public openModal(user: any): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.selectedUser = null;
    this.isModalOpen = false;
  }

  public allusers: any = []



  deleteUser(_id: string) {
    this.authService.deleteUser(_id).subscribe((response) => {
      this.closeModalAndReloadPage();
      // console.log('User delete success:', response)
    })
  }

  closeModalAndReloadPage() {
    this.closeModal();
    window.location.reload();
  }

}
