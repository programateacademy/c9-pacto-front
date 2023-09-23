import { Component } from '@angular/core';
import { TermsConditionsService } from '../../services/termsConditions/terms-conditions.service';

@Component({
  selector: 'app-modal-terms-conditios',
  templateUrl: './modal-terms-conditios.component.html',
  styleUrls: ['./modal-terms-conditios.component.css']
})
export class ModalTermsConditiosComponent {

  constructor( private termsConditions: TermsConditionsService){}

  ngOnInit(): void{}

  closeModal(){
    this.termsConditions.$modal.emit(false)
  }
}
