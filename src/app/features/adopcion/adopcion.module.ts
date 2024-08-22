import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AdopcionRoutingModule } from './adopcion-routing.module';
import { HeaderadopcionComponent } from './components/headeradopcion/headeradopcion.component';

import { SharedModule } from '../../shared/shared.module';
import { CardsadopcionComponent } from './components/cardsadopcion/cardsadopcion.component';
import { CardsComponent } from './components/cards/cards.component';
import { NuevaadopcionComponent } from './pages/nuevaadopcion/nuevaadopcion.component';



@NgModule({
  declarations: [  
    HeaderadopcionComponent,
     CardsadopcionComponent,
     CardsComponent,
     

  ],
  imports: [
    FormsModule,
    CommonModule,
    AdopcionRoutingModule,
    SharedModule
  ], exports:[
    HeaderadopcionComponent,
     CardsadopcionComponent,
     CardsComponent,
  ]
})
export class AdopcionModule { }
