import { Component } from '@angular/core';
import { SwitchService } from '../services/modal/switch.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private modalSS: SwitchService){}

  ngOnInit():void{
  }


  closeModal(){

    this.modalSS.$modal.emit(false)
  }

}
