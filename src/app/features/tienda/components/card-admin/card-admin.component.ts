import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService, DataResponse} from'../../services/producto-tienda.service';
import { from } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrl: './card-admin.component.scss'
})
export class CardAdminComponent implements OnInit, OnChanges {
  @Input() searchTerm: string = '';
  @Input() selectedCategory: string = 'Todos';


  allData: DataResponse[] = [];
  filteredData: DataResponse[] = [];

  categoryFilteredData: DataResponse[] = []; // Nueva propiedad para almacenar los datos filtrados por categoría


  constructor(private productService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();

  }

  ngOnChanges(changes: SimpleChanges): void{
    //this.filterData();
    if (changes['selectedCategory']) {
      this.applyCategoryFilter(); // Aplicar filtro de categoría cuando la categoría cambie
    }
    if (changes['searchTerm']) {
      this.filterData(); // Aplicar filtro de búsqueda cuando el término de búsqueda cambie
    }
  }

  loadProducts(): void {
    this.productService.getDataProducts().subscribe((data) => {
      this.allData = data;
      console.log(this.allData);
      this.applyCategoryFilter();

    })
  }


  filterData() {
    if(!this.searchTerm){
     // this.filteredData = this.allData;
     this.filteredData = this.categoryFilteredData; // Filtra en base a los datos filtrados por categoría
    }else{
      this.filteredData = this.allData.filter( product =>
       product.nombreProducto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       product.categoria.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

  }

  applyCategoryFilter() {
    if (this.selectedCategory && this.selectedCategory !== 'Todos') {
      this.categoryFilteredData = this.allData.filter(product => product.categoria === this.selectedCategory);
    } else {
      this.categoryFilteredData = [...this.allData]; // Copia todos los datos si la categoría es 'Todos'
    }
    this.filterData(); // Llamar a filterData después de aplicar el filtro de categoría
  }

  onProductDelete(productoId: string): void{
    console.log('Eliminando producto:', productoId);
      this.productService.deleteProduct(productoId).pipe(
        tap(() => {
          console.log('Producto eliminado con éxito');
          this.allData = this.allData.filter( product => product.IdProducto !== productoId);
          this.applyCategoryFilter();

        }),
        catchError( (error) => {
          console.error('Error al eliminar el producto', error);
          return of (null)
        }),
        finalize(() => {
          console.log('Operación de eliminación finalizada');
        })
      ).subscribe();
  }

  redirectToEditProduct(idProduct: string){
    sessionStorage.setItem('ProductId', idProduct);
    let editarProducto = 'true'
    sessionStorage.setItem('EditProduct', editarProducto );

    this.router.navigate(['subir-producto'])
  }

}
