import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-info-t',
  templateUrl: './info-t.component.html',
  styleUrl: './info-t.component.scss'
})
export class InfoTComponent {
  categorias: string[] = ['Juguetes', 'Comida', 'Accesorios', 'Otros','Medicamentos'];

  @Output() categoriaSeleccionada = new EventEmitter<string>();

  filtrar(categoria: string) {
    this.categoriaSeleccionada.emit(categoria);
  }
}
