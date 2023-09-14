import { Component } from '@angular/core';

@Component({
  selector: 'app-headerauth',
  templateUrl: './headerauth.component.html',
  styleUrls: ['./headerauth.component.css']
})
export class HeaderauthComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
