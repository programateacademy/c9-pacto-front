import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { SwitchService } from '../services/modal/switch.service';
import { ForoService } from '../services/home/home.service';
import { Home } from 'src/app/models/item';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private modalSS: SwitchService, private foroService: ForoService,
    private authService:AuthService, private changeDetectorRef: ChangeDetectorRef){}

  ngOnInit():void{
  }


  closeModal(){

    this.modalSS.$modal.emit(false)
  }

  @Output() newPublication = new EventEmitter<Home>();

  createPost(description: string, image: string){
    const userId = this.authService.getLoggedInUserId();
    const newPost = {

      userId: userId,
      description: description,
      image: image,
      likes: []
    }


    this.foroService.createPost("publictpoofo/create", newPost)
    .subscribe((data: Home) =>{
      this.newPublication.emit(data);
      this.changeDetectorRef.detectChanges();
      location.reload();
    })

  }
}
