import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './common/loader/loader.component';
import { SkeletonComponent } from './common/skeleton/skeleton.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SkeletonComponent
  ]
})

export class CoreModule { }
