import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-tienda-admin',
  templateUrl: './tienda-admin.component.html',
  styleUrl: './tienda-admin.component.scss'
})
export class TiendaAdminComponent {
  searchTerm: string = '';
  selectedCategory: string = 'Todos';

  constructor(private productoService: ProductoService) {}

  onSearch(term: string): void {
      this.searchTerm = term;
  }

  onCategorySelected(category: string){
     this.selectedCategory = category;
  }
}
