import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrls: ['./header-tienda.component.scss']
})
export class HeaderTiendaComponent {

  constructor(private router: Router, private productosService: ProductoService){}

  busqueda: string = '';
  // productos: productos[] = [];

   @Output() search = new EventEmitter<string>();
   @Output() buscar = new EventEmitter<string>();

   onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
   }

   redirectToAnotherPage(){
    this.router.navigate(['/subir-producto'])
   }




  /*
  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data;
      console.log('Datos cargados:', this.productos);
    });
  } */

  buscarProductos(): void {
    this.buscar.emit(this.busqueda.trim()); // Emitir el término de búsqueda
  }

  isModalOpen = false;

  showmodal() {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }

}


