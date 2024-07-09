import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-headeradopcion',
  templateUrl: './headeradopcion.component.html',
  styleUrl: './headeradopcion.component.scss'
})
export class HeaderadopcionComponent {

  @Output() filterEvent = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch() {
    this.filterEvent.emit(this.searchTerm.toLowerCase());
}
}
