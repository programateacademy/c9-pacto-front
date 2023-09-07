import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/headerhome/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './common/loader/loader.component';
import { SkeletonComponent } from './common/skeleton/skeleton.component';
import { ModalComponent } from './libs/modal.component';
import { Header2Component } from './layout/headerauth/header2.component';
import { Aside2Component } from './layout/aside2/aside2.component';
import { AsideComponent } from './layout/aside/aside.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SkeletonComponent,
    ModalComponent,
    Header2Component,
    Aside2Component,
    AsideComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SkeletonComponent,
    ModalComponent
  ]
})

export class CoreModule { }
