import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {
  searchTerm: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  buscar() {
    this.searchEvent.emit(this.searchTerm.toLowerCase());
  }
}
