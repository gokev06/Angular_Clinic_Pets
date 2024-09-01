import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { productos, ProductoService } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-info-t',
  templateUrl: './info-t.component.html',
  styleUrl: './info-t.component.scss'
})

export class InfoTComponent implements OnInit {
  categorias: string[] = ['Todos', 'Juguetes', 'Alimento', 'Accesorios', 'Medicamentos', 'Otros'];
  @Output() categoriaSeleccionada = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  
  filtrar(categoria: string) {
    this.categoriaSeleccionada.emit(categoria);
  }
}