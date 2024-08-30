import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaRoutingModule } from './tienda-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { CardComponent } from './components/card-tienda/card.component';
import { HeaderTiendaComponent } from './components/header-tienda/header-tienda.component';
import { TiendaAdminComponent } from './pages/tienda-admin/tienda-admin.component';

@NgModule({
  declarations: [
    AgregarProductoComponent,
    CardComponent,
    HeaderTiendaComponent,
    TiendaAdminComponent
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
