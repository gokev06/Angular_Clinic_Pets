import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService,  DataResponse } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrls: ['./header-tienda.component.scss']
})
export class HeaderTiendaComponent {

  constructor(private router: Router, private productosService: ProductoService){}

  busqueda: string = '';
  allData: DataResponse[] = [];

   @Output() search = new EventEmitter<string>();

   onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
   }

   redirectToAnotherPage(){
    this.router.navigate(['/subir-producto'])
   }

  isModalOpen = false;

  showmodal() {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }

}


