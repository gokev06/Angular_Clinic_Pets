import { Component, OnInit } from '@angular/core';
import { ProductoService, DataResponse } from '../../services/producto-tienda.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda-producto',
  templateUrl: './tienda-producto.component.html',
  styleUrls: ['./tienda-producto.component.scss']
})
export class TiendaProductoComponent implements OnInit {
  // Variables para el zoom de la imagen
  posX: number = 0;
  posY: number = 0;
  zoomActivo: boolean = false;

  data: DataResponse[] = [];
  allData: DataResponse[] = [];
  productPush: any = null;
  precioTotal: number = 0;
  idProducto: any = null;
  cantidad: number = 1;




  // Método para manejar el zoom de la imagen
  activarZoom() {
    this.zoomActivo = true;
  }

  desactivarZoom() {
    this.zoomActivo = false;
    this.posX = 0;
    this.posY = 0;
  }

  moverImagen(event: MouseEvent) {
    if (this.zoomActivo) {
      const contenedor = event.currentTarget as HTMLElement;
      const { left, top, width, height } = contenedor.getBoundingClientRect();

      // Calcular la posición del mouse dentro del contenedor
      const x = event.clientX - left;
      const y = event.clientY - top;

      // Calcular la posición de la imagen basada en el mouse
      this.posX = ((x / width) * 100) - 50;
      this.posY = ((y / height) * 100) - 50;
    }
  }


    // Nueva variable para manejar la cantidad

    soldOut: boolean = false;

    addProduct(){
      if (this.cantidad < this.data[0].stock) {
         this.soldOut = false;
         this.cantidad++;
         this.actualizarProductPush();
      } else {
        this.soldOut = true
      }
    }

    removeProduct(){
      if (this.cantidad > 1) {
        this.soldOut = false;
        this.cantidad--;
        this.actualizarProductPush();
      }
    }


  // Método para cambiar la cantidad
  cambiarCantidad(cambio: number) {
    this.cantidad += cambio;
    if (this.cantidad < 1) {
      this.cantidad = 1;
    }
  }

  selectedTab: string = 'info'; // Pestaña seleccionada por defecto

  // Método para seleccionar una pestaña
  selectTab(tab: string) {
    this.selectedTab = tab;
  }


  currentIndex: number = 0;

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.callProductId();
    this.callAllProduct();
    setInterval(() => this.showSlide(this.currentIndex + 1), 5000); // Auto-slide functionality
    this.idProducto = sessionStorage.getItem('ProductId');
  }

  actualizarProductPush(){
    if (this.data.length > 0) {
       this.precioTotal = this.data[0].precio * this.cantidad;
       this.productPush = {
        IdProducto: this.idProducto,
        imagen: this.data[0].imagen,
        nombreProducto: this.data[0].nombreProducto,
        cantidad: this.cantidad,
        precioUnitario: this.data[0].precio,
        precioTotal: this.precioTotal
      }
    }
  }



  addProductCart(): void{
    if (!this.productPush) {
      console.error('productPush no está inicializado');
      return;
    }

    this.productoService.addProductCart(this.productPush)
     .pipe(
      catchError( error => {
        console.error('erro al guardar el producto', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al subir el producto al carrito.',
          icon: 'error',
          timer: 5000
        });
        return of (null);
      })
     )
     .subscribe ( response => {
       if (response) {
          console.log('Producto subido con exito:', response);
          Swal.fire({
            title: '¡Producto agregado a su carrito!',
            imageUrl: 'assets/images/imgcitas/confirmar.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'producto subido confirmado'
          }).then( () => {
            this.router.navigate(['/tienda']);
          });
       };
     });
  }

  // llama a todos los productos disponibles
  callAllProduct(): void{
    this.productoService.getDataProducts().subscribe((data) => {
      this.allData = data;
      console.log(this.allData);

    })
  }

  // llama a un producto en especifico
  callProductId():void{
    const idProducto: any = sessionStorage.getItem('ProductId');
    this.productoService.callProductData(idProducto).subscribe((data) => {
       this.data = data
       console.log(this.data); //para verificar los datos recibidos
       this.actualizarProductPush();
    })
  }

  showSlide(index: number) {
    const items = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>;
    const innerCarousel = document.querySelector('.carousel-inner') as HTMLElement;

    if (items.length === 0) return;

    // Asegúrate de que el índice esté dentro del rango
    const totalVisibleItems = 3;
    const totalItems = items.length;
    const maxIndex = totalItems - totalVisibleItems;

    if (index > maxIndex) {
      this.currentIndex = 0; // Volver al inicio si se supera el límite
    } else if (index < 0) {
      this.currentIndex = maxIndex; // Ir al final si es menor que 0
    } else {
      this.currentIndex = index;
    }

    innerCarousel.style.transform = `translateX(-${this.currentIndex * (100 / totalVisibleItems)}%)`;
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }}
