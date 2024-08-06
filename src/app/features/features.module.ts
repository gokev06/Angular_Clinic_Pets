import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CitasComponent } from './citas/citas.component';
import { SharedModule } from '../shared/shared.module';
import { PagehomeComponent } from './pagehome/pagehome.component';
import { AdopcionComponent } from './adopcion/adopcion.component';
import { CardsadopcionComponent } from './adopcion/components/cardsadopcion/cardsadopcion.component';
import { HeaderadopcionComponent } from './adopcion/components/headeradopcion/headeradopcion.component';
import { CardsComponent } from './adopcion/components/cards/cards.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PagesHomeRegisterComponent } from './pagehome/pages/pages-home-register/pages-home-register.component';
import { PagehomeModule } from './pagehome/pagehome.module';
import { PagesHomeAdminComponent } from './pagehome/pages/pages-home-admin/pages-home-admin.component';
import { PagesHomeVetComponent } from './pagehome/pages/pages-home-vet/pages-home-vet.component';
import { TablaCitasComponent } from './citas/pages/tabla-citas/tabla-citas.component';



@NgModule({
  declarations: [
    CitasComponent,
    PagehomeComponent,
    AdopcionComponent,
    CardsadopcionComponent,
    HeaderadopcionComponent,
    CardsComponent,
    LoginComponent,
    RegistroComponent,
    PagesHomeRegisterComponent,
    PagesHomeAdminComponent,
    PagesHomeVetComponent,
    TablaCitasComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    PagehomeModule,
    ReactiveFormsModule ,// Importa ReactiveFormsModule aquí
  ],
  exports:[
    CitasComponent,
    PagehomeComponent,
    AdopcionComponent,
    CardsadopcionComponent,
    HeaderadopcionComponent,
    CardsComponent,
    LoginComponent,
    RegistroComponent,
    PagesHomeRegisterComponent,
    PagesHomeAdminComponent,
    PagesHomeVetComponent,
    TablaCitasComponent
  ]
})
export class FeaturesModule { }
