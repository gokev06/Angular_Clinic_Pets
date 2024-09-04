import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrls: ['./header-tienda.component.scss']
})
export class HeaderTiendaComponent {

  constructor(private router: Router){}



   @Output() search = new EventEmitter<string>();

   onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
   }

   redirectToAnotherPage(){
    this.router.navigate(['/subir-producto'])
   }
}


