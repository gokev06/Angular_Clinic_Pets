import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductoService } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-info-t',
  templateUrl: './info-t.component.html',
  styleUrl: './info-t.component.scss'
})

export class InfoTComponent implements OnInit {
  categorias: string[] = ['Todos', 'Juguete', 'Alimentos', 'Accesorios', 'Medicamento', 'Otros'];
  @Output() categoriaSeleccionada = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}


  filtrar(categoria: string) {
    this.categoriaSeleccionada.emit(categoria);
  }
}
