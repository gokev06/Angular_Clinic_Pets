import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{
@Input() adopcion ={
  id: '',
  nombre: '',
  edad: '',
  especie: '',
    raza: '',
  sexo: '',
  estirilizacion: '',
  vacunacion: '',
  telefono: '',
  municipio: '',
  ciudad: '',
  image: ''
}

constructor(){}

ngOnInit() {
  
}

}
