import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService,  DataResponse } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrls: ['./header-tienda.component.scss']
})
export class HeaderTiendaComponent implements OnInit {

  constructor(private router: Router, private productosService: ProductoService){}

  busqueda: string = '';
  allData: DataResponse[] = [];
  userRol: string | null = null;
  viewCartBtn: boolean = false;

   @Output() search = new EventEmitter<string>();


   ngOnInit(): void {
     this.rolSeleccionado();
   }

   onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
   }

   redirectToAnotherPage(){
    let editarProducto = 'false'
    sessionStorage.setItem('EditProduct', editarProducto );
    sessionStorage.setItem('adminInventario', 'false')
    this.router.navigate(['/subir-producto'])
   }

   rolSeleccionado(): void{
    this.userRol = sessionStorage.getItem('userRole');
    if (this.userRol == 'usuario') {
       this.viewCartBtn = true
    }
  }

  isModalOpen = false;

  showmodal() {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }

}


