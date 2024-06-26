import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasComponent } from './citas/citas.component';
import { SharedModule } from '../shared/shared.module';
import { PagehomeComponent } from './pagehome/pagehome.component';
import { AdopcionModule } from './adopcion/adopcion.module';
import { CitasModule } from './citas/citas.module';
import { AdopcionComponent } from './adopcion/adopcion.component';




@NgModule({
  declarations: [
    CitasComponent,
    PagehomeComponent,
    AdopcionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CitasModule,
    AdopcionModule,
    SharedModule,
    ReactiveFormsModule ,// Importa ReactiveFormsModule aquí
  ],
  exports:[
    CitasComponent,
    PagehomeComponent,
  ]
})
export class FeaturesModule { }
