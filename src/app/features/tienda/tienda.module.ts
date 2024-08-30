import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaRoutingModule } from './tienda-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { CardComponent } from './components/card-tienda/card.component';

@NgModule({
  declarations: [
    AgregarProductoComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[
  ]
})
export class TiendaModule { }
