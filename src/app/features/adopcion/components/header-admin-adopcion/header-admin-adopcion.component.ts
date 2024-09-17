import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataResponse, ProductoService } from '../../../tienda/services/producto-tienda.service';
import { Adopciones } from '../../services/solicitud-adopcion.service';

@Component({
  selector: 'app-header-admin-adopcion',
  templateUrl: './header-admin-adopcion.component.html',
  styleUrl: './header-admin-adopcion.component.scss'
})
export class HeaderAdminAdopcionComponent {
  searchTerm: string = '';
  constructor(private router: Router, private productosService: ProductoService){}

  busqueda: string = '';
  allData: DataResponse[] = [];
  userRol: string | null = null;
  viewCartBtn: boolean = false;
  currentSlide: number = 0;
  adopciones: Adopciones[] = [];
  currentSpecies: 'perro' | 'gato' | 'todos' = 'todos';
  currentSort: 'az' | 'za' | '' = '';
  filteredAdopciones: Adopciones[] = [];

   @Output() search = new EventEmitter<string>();



   ngOnInit(): void {
     this.rolSeleccionado();
   }


   onSearch(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }


  applyFilters() {
    let result = this.adopciones;

    // Aplicar búsqueda
    if (this.searchTerm) {
      result = result.filter(adopcion =>
        adopcion.nombreMascota.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        adopcion.ubicacion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro de especie
    if (this.currentSpecies !== 'todos') {
      result = result.filter(adopcion =>
        adopcion.especieMascota.toLowerCase() === this.currentSpecies
      );
    }

    // Aplicar ordenamiento
    if (this.currentSort === 'az') {
      result.sort((a, b) => a.nombreMascota.localeCompare(b.nombreMascota));
    } else if (this.currentSort === 'za') {
      result.sort((a, b) => b.nombreMascota.localeCompare(a.nombreMascota));
    }

    this.filteredAdopciones = result;
  }


   redirectToAnotherPage(){
    let editarProducto = 'false'
    sessionStorage.setItem('EditProduct', editarProducto );
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
