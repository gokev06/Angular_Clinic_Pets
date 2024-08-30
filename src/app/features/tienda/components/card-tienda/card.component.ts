import { Component, Input, OnInit } from '@angular/core';
import { ProductoService, productos } from'../../services/producto-tienda.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit  {

  @Input() productos: productos[] = []; // Recibir productos filtrados desde el componente padre

  constructor() {}

  ngOnInit(): void {
    // Inicialización adicional si es necesario
  }
}