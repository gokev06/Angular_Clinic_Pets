import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaRoutingModule } from './tienda-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { CardComponent } from './components/card-tienda/card.component';
import { InfoTComponent } from './components/filtro/info-t.component';
import { FiltroTiendaComponent } from './components/filtro-tienda/filtro-tienda.component';

@NgModule({
  declarations: [
    AgregarProductoComponent,
    CardComponent,
    InfoTComponent,
    FiltroTiendaComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class TiendaModule { }
