import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdopcionRoutingModule } from './adopcion-routing.module';
import { HeaderadopcionComponent } from './components/headeradopcion/headeradopcion.component';
import { SharedModule } from '../../shared/shared.module';
import { CardsadopcionComponent } from './components/cardsadopcion/cardsadopcion.component';
import { CardsComponent } from './components/cards/cards.component';
import { InfoAdopcionComponent } from './pages/info-adopcion/info-adopcion.component';
import { RouterModule } from '@angular/router';
import { AdminAdopcionesComponent } from './pages/admin-adopciones/admin-adopciones.component';
import { AdminCardsComponent } from './components/admin-cards/admin-cards.component';
import { AdmiCardsNuevaComponent } from './components/admi-cards-nueva/admi-cards-nueva.component';
import { AdmiHeaderComponent } from './components/admi-header/admi-header.component';

import { NuevaadopcionComponent } from './pages/nuevaadopcion/nuevaadopcion.component';
import { CartaSolicitudAdopcionComponent } from './components/carta-solicitud-adopcion/carta-solicitud-adopcion.component';
import { SolicitudAdopcionComponent } from './pages/solicitud-adopcion/solicitud-adopcion.component';
import { HeaderAdminAdopcionComponent } from './components/header-admin-adopcion/header-admin-adopcion.component';




@NgModule({
  declarations: [
     CardsComponent,
     AdminCardsComponent,
     AdmiCardsNuevaComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdopcionRoutingModule,
    SharedModule,
    RouterModule

  ],
   exports:[
     CardsComponent,
     SharedModule

  ],
})
export class AdopcionModule { }
