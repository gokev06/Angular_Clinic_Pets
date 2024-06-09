import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasComponent } from './citas/citas.component';
import { SharedModule } from '../shared/shared.module';
import { PagehomeComponent } from './pagehome/pagehome.component';




@NgModule({
  declarations: [
    CitasComponent,
    PagehomeComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule ,// Importa ReactiveFormsModule aquí
  ],
  exports:[
    CitasComponent,
    PagehomeComponent,
  ]
})
export class FeaturesModule { }
