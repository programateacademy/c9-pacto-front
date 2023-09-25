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
import { SkeletonProfileComponent } from './common/skeleton-profile/skeleton-profile.component';
import { SkeletonAsideComponent } from './common/skeleton-aside/skeleton-aside.component';
import { ModalTermsConditiosComponent } from './layout/modal-terms-conditios/modal-terms-conditios.component';



@NgModule({
  declarations: [
    FooterComponent,
    LoaderComponent,
    SkeletonComponent,
    ModalComponent,
    AsideComponent,
    HeaderComponent,
    HeaderauthComponent,
    ModalUserComponent,
    SkeletonProfileComponent,
    SkeletonAsideComponent,
    ModalTermsConditiosComponent

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
    ModalUserComponent,
    ModalTermsConditiosComponent

  ]
})

export class CoreModule { }
