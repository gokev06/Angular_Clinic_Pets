import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService, DataResponse} from'../../services/producto-tienda.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() searchTerm: string = '';
  @Input() selectedCategory: string = 'Todos';


  allData: DataResponse[] = [];
  filteredData: DataResponse[] = [];

  categoryFilteredData: DataResponse[] = []; // Nueva propiedad para almacenar los datos filtrados por categoría

  constructor(private productService: ProductoService, private router: Router){}

  ngOnInit(): void {
    this.productService.getDataProducts().subscribe((data) => {
      this.allData = data
      console.log(this.allData); // Para verificar los datos recibidos
      this.applyCategoryFilter(); // Aplicar filtro de categoría al inicio
     // this.filterData();
    })
  }

  redirectToInfoProduct(idProduct: string){
      sessionStorage.setItem('ProductId', idProduct);
      console.log(sessionStorage.getItem('ProductId'));

       this.router.navigate(['/info-producto'])
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

}

/*
filterData(){
  this.filteredData = this.allData.filter( product => {
    const matchesSearch = this.searchTerm
    ? product.nombreProducto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(this.searchTerm.toLowerCase())
    : true;

    const matchesCategory = this.selectedCategory === 'Todos'
    ? true
    : product.categoria === this.selectedCategory;

    return matchesSearch && matchesCategory;
  })
}*/

 /* filterData() {
    if(!this.searchTerm){
      this.filteredData = this.allData;
    }else{
      this.filteredData = this.allData.filter( product =>
       product.nombreProducto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       product.categoria.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  } */
