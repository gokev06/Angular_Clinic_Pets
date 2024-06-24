import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdopcionRoutingModule } from './adopcion-routing.module';
import { HeaderadopcionComponent } from './components/headeradopcion/headeradopcion.component';

import { SharedModule } from '../../shared/shared.module';
import { CardsadopcionComponent } from './components/cardsadopcion/cardsadopcion.component';


@NgModule({
  declarations: [  
    HeaderadopcionComponent,
     CardsadopcionComponent
  ],
  imports: [
    CommonModule,
    AdopcionRoutingModule,
    SharedModule
  ], exports:[
    HeaderadopcionComponent,
    CardsadopcionComponent
  ]
})
export class AdopcionModule { }
