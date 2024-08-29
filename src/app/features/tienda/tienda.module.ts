import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaRoutingModule } from './tienda-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { CardComponent } from './components/card-tienda/card.component';
import { TiendaProductoComponent } from './components/tienda-producto/tienda-producto.component';
import { FeaturesModule } from '../features.module';
import { InfoProductoTiendaComponent } from './pages/info-producto-tienda/info-producto-tienda.component';
import { HeaderComponent } from '../../shared/components/organisms/header/header.component';
@NgModule({
  declarations: [
    AgregarProductoComponent,
    CardComponent,
    InfoProductoTiendaComponent
  ],
  imports: [
    FeaturesModule,
    CommonModule,
    TiendaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    TiendaProductoComponent,
    InfoProductoTiendaComponent
  ]
})
export class TiendaModule { }
