import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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

  constructor(private authService: AuthService) {}



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


  // deleteUser(userId: string): void {
  //   if (userId) {
  //     console.error('El userId es undefined o null. No se puede eliminar.');
  //     return;
  //   }

  //   if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
  //     this.authService.deleteUser(userId).subscribe(
  //       () => {
  //         console.log('Usuario eliminado exitosamente.');
  //         this.loadData();
  //       },
  //       (error) => {
  //         console.error('Error al eliminar el usuario:', error);
  //       }
  //     );
  //   }
  // }





}
