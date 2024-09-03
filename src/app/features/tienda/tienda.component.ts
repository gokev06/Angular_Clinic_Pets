import { Component, Input} from '@angular/core';
import { ProductoService } from './services/producto-tienda.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent {

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
