import { Component, EventEmitter, Output, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionImgInput') descriptionImgInput!: ElementRef<HTMLInputElement>;
  @ViewChild('publishButton') publishButton!: ElementRef<HTMLButtonElement>;

  constructor(private modalSS: SwitchService, private foroService: ForoService,
    private authService:AuthService, private changeDetectorRef: ChangeDetectorRef){}

  showAlert: boolean = false;
  showAlertdes: boolean = false;

  ngOnInit():void{
  }


  closeModal(){

    this.modalSS.$modal.emit(false)
  }


  @Output() newPublication = new EventEmitter<Home>();

  createPost(description: string, image: string ,descriptionImg: string){
    const userId = this.authService.getLoggedInUserId();
    const imageValue = this.imageInput.nativeElement.value.trim();
    const descriptionImgValue = this.descriptionImgInput.nativeElement.value.trim();

    if (imageValue !== '' && descriptionImgValue === '') {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
      return; // No crear la publicación si falta la descripción de imagen.
    }

    if (descriptionImgValue !== '' && imageValue === '') {
      this.showAlertdes = true;
      setTimeout(() => {
        this.showAlertdes = false;
      }, 3000);

      return; // No crear la publicación si falta la URL de imagen
    }


    const newPost = {
      userId: userId,
      description: description,
      image: image,
      descriptionImg,
      likes: []
    }

    this.foroService.createPost("publictpacto/create", newPost)
      .subscribe((data: Home) => {
        this.newPublication.emit(data);
        this.changeDetectorRef.detectChanges();
        location.reload();
      });
  }

}
