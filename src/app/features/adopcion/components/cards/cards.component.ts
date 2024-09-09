import { Component, Input, OnInit } from '@angular/core';
import { adopcion, Adopciones } from '../../services/solicitud-adopcion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit{
  @Input() adopcion!: Adopciones; // Puedes eliminar la inicialización anterior

constructor(private Router: Router){}

ngOnInit() {

}




}
