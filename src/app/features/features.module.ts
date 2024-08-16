import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CitasComponent } from './citas/citas.component';
import { SharedModule } from '../shared/shared.module';
import { PagehomeComponent } from './pagehome/pagehome.component';
import { AdopcionComponent } from './adopcion/adopcion.component';
import { TableHistorialComponent } from './citas/components/table-historial/table-historial.component';
import { CardsadopcionComponent } from './adopcion/components/cardsadopcion/cardsadopcion.component';
import { HeaderadopcionComponent } from './adopcion/components/headeradopcion/headeradopcion.component';
import { CardsComponent } from './adopcion/components/cards/cards.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PagesNuevaadopcionComponent } from './adopcion/pages/pages-nuevaadopcion/pages-nuevaadopcion.component';
import { FormularioAdopcionComponent } from './adopcion/components/formulario-adopcion/formulario-adopcion.component';
import { CardformularioComponent } from './adopcion/components/cardformulario/cardformulario.component';
import { InfoAdopcionComponent } from './adopcion/pages/info-adopcion/info-adopcion.component';




@NgModule({
  declarations: [
    CardformularioComponent,
    CitasComponent,
    PagehomeComponent,
    AdopcionComponent,
    CardsadopcionComponent,
    HeaderadopcionComponent,
    CardsComponent,
    LoginComponent,
    RegistroComponent,
    PagesNuevaadopcionComponent,
    FormularioAdopcionComponent,
    InfoAdopcionComponent
   
  ],
  imports: [
    FormsModule,
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
