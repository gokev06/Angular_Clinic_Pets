import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService, DataResponse} from'../../services/producto-tienda.service';
import { from } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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

  onProductDelete(productoId: string): void {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: '¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#7DFF82',
      cancelButtonColor: '#F57171',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de confirmación
      imageWidth: 200,
      imageHeight: 200
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Eliminando producto:', productoId);
        this.productService.deleteProduct(productoId).pipe(
          tap(() => {
            Swal.fire({
              title: '¡Producto eliminado!',
              text: 'El producto ha sido eliminado exitosamente.',
              imageUrl: '../../../../../assets/images/imgcitas/confirmar.png', // Imagen de éxito
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonColor: '#7DFF82'
            });
            this.allData = this.allData.filter(product => product.IdProducto !== productoId);
            this.applyCategoryFilter();
          }),
          catchError((error) => {
            console.error('Error al eliminar el producto', error);
            Swal.fire({
              title: '¡Error!',
              text: 'Ocurrió un error al intentar eliminar el producto.',
              imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de error
              imageWidth: 200,
              imageHeight: 200,
              icon: 'error',
              confirmButtonColor: '#F57171'
            });
            return of(null);
          }),
          finalize(() => {
            console.log('Operación de eliminación finalizada');
          })
        ).subscribe();
      }
    });
  }
    
  redirectToEditProduct(productoId: string) {
    sessionStorage.setItem('adminInventario', 'false')
    this.router.navigate(['/editar-producto', productoId]);
  }

}
