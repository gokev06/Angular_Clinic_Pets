import { Component, Input, OnInit } from '@angular/core';
import { ProductoService} from'../../services/producto-tienda.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  productos: any[] = [];

  constructor(private productService: ProductoService){}

  ngOnInit(): void {

  }

}
