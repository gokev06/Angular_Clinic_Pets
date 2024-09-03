import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrls: ['./header-tienda.component.scss']
})
export class HeaderTiendaComponent {
   @Output() search = new EventEmitter<string>();

   onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
   }
}


