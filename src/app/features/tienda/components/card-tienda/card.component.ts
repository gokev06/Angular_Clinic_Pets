import { Component, OnInit } from '@angular/core';
import { ProductoService, productos } from'../../services/producto-tienda.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit  {

  productos: productos[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data: productos[]) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });
  }
}