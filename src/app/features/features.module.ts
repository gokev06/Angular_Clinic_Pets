import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { PagehomeComponent } from './pagehome/pagehome.component';




@NgModule({
  declarations: [
    PagehomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule // Importa ReactiveFormsModule aquí
  ],
  exports:[
   
    PagehomeComponent
  ]
})
export class FeaturesModule { }
