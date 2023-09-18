import { Component } from '@angular/core';
import { SwitchUserService } from '../../services/modalUs/switch-user.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent {

  constructor(private modalUser: SwitchUserService){}

  ngOnInit():void{
  }

  closeModal(){

    this.modalUser.$modal.emit(false)
  }
}
