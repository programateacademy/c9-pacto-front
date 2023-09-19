import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './common/loader/loader.component';
import { SkeletonComponent } from './common/skeleton/skeleton.component';
import { ModalComponent } from './libs/modal.component';
import { AsideComponent } from './layout/aside/aside.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderauthComponent } from './layout/headerauth/headerauth.component';
import { RouterModule } from '@angular/router';
import { ModalUserComponent } from './libs/modal-user/modal-user.component';



@NgModule({
  declarations: [
    FooterComponent,
    LoaderComponent,
    SkeletonComponent,
    ModalComponent,
    AsideComponent,
    HeaderComponent,
    HeaderauthComponent,
    ModalUserComponent

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    LoaderComponent,
    SkeletonComponent,
    ModalComponent,
    HeaderComponent,
    AsideComponent,
    HeaderauthComponent,
    ModalUserComponent

  ]
})

export class CoreModule { }
