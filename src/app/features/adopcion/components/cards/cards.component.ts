import { Component, Input, OnInit } from '@angular/core';
import { adopcion } from '../../services/solicitud-adopcion.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{
@Input() adopcion: adopcion = {
  id: 0,
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

constructor(private Router: Router){}

ngOnInit() {
  
}

ruta(){
  this.Router.navigate(['info-adopcion'])
}

}
