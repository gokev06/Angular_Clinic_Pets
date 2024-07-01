import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasComponent } from './citas/citas.component';
import { SharedModule } from '../shared/shared.module';
import { PagehomeComponent } from './pagehome/pagehome.component';
import { AdopcionComponent } from './adopcion/adopcion.component';
import { AdopcionModule } from './adopcion/adopcion.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';




@NgModule({
  declarations: [
    CitasComponent,
    PagehomeComponent,
  AdopcionComponent,
  LoginComponent,
  RegistroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdopcionModule,
    ReactiveFormsModule ,// Importa ReactiveFormsModule aquí
  ],
  exports:[
    CitasComponent,
    PagehomeComponent,
  ]
})
export class FeaturesModule { }
