import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdopcionRoutingModule } from './adopcion-routing.module';
import { HeaderadopcionComponent } from './components/headeradopcion/headeradopcion.component';
import { SharedModule } from '../../shared/shared.module';
import { CardsadopcionComponent } from './components/cardsadopcion/cardsadopcion.component';
import { CardsComponent } from './components/cards/cards.component';
<<<<<<< HEAD
import { InfoAdopcionComponent } from './pages/info-adopcion/info-adopcion.component';
import { RouterModule } from '@angular/router';
=======
import { NuevaadopcionComponent } from './pages/nuevaadopcion/nuevaadopcion.component';
>>>>>>> 0d1e46686863cfc433052e5b280df7a648ffc107



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
    SharedModule,
    RouterModule 
    
  ], exports:[
    HeaderadopcionComponent,
     CardsadopcionComponent,
     CardsComponent,
  ]
})
export class AdopcionModule { }
