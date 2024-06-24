import { Component, OnInit } from '@angular/core';
import {  SolicitudAdopcionService } from '../../services/solicitud-adopcion.service';

@Component({
  selector: 'app-cardsadopcion',
  templateUrl: './cardsadopcion.component.html',
  styleUrl: './cardsadopcion.component.scss'
})
export class CardsadopcionComponent  implements OnInit {

  adopcion: any;

  constructor(private SolicitudAdopcionService:SolicitudAdopcionService){}

  ngOnInit() {
    this.SolicitudAdopcionService. getAdopciones()
    .subscribe(res=>{
      this.adopcion = res
   
})
}

}
