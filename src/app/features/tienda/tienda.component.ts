import { Component, Input} from '@angular/core';
import { ProductoService } from './services/producto-tienda.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent {

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {

  }



}
