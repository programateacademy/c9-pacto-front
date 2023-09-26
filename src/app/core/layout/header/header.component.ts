import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userId: string | null = null;
  isDropdownOpen = false; // Variable para controlar la visibilidad del menú desplegable

  isAdminUser: boolean = false;

  constructor(private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
    // Obtiene el valor de userRole de AuthService
    const userRoleArray = this.authService.getLoggedInUserRole();
    console.log('Valor de userRole:', userRoleArray);

    // Verifica si userRoleArray contiene un objeto con la propiedad 'name'
    if (Array.isArray(userRoleArray) && userRoleArray.length > 0 && userRoleArray[0].name) {
      this.isAdminUser = userRoleArray[0].name.toLowerCase() === 'admin';
    } else {
      this.isAdminUser = false;
    }
    console.log('Valor de isAdminUser Header:', this.isAdminUser);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  redirectAdmin() {
    this.router.navigate(['/admin', this.userId]);
  }

  //Cerrar sesión
  logout() {
    this.authService.logout()
  }

  // Método para alternar la visibilidad del menú
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

    // Obtener el elemento del menú desplegable
    const dropdownMenu = this.el.nativeElement.querySelector('#dropdownMenu');

    if (this.isDropdownOpen) {
      // Mostrar el menú desplegable
      this.renderer.removeClass(dropdownMenu, 'hidden');
    } else {
      // Ocultar el menú desplegable
      this.renderer.addClass(dropdownMenu, 'hidden');
    }
  }

  // Método para cerrar el menú cuando se hace clic en cualquier lugar fuera de él
  closeDropdown(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
      const dropdownMenu = this.el.nativeElement.querySelector('#dropdownMenu');
      this.renderer.addClass(dropdownMenu, 'hidden');
    }
  }

  // Método para cerrar el menú cuando se hace clic en el botón "X"
  closeDropdownWithButton() {
    this.isDropdownOpen = false;
    const dropdownMenu = this.el.nativeElement.querySelector('#dropdownMenu');
    this.renderer.addClass(dropdownMenu, 'hidden');
  }

}
