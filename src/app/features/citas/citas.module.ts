import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CitasRoutingModule } from './citas-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PagesHistorialComponent } from './pages/pages-historial/pages-historial.component';
import { TableHistorialComponent } from './components/table-historial/table-historial.component';
import { CrearHistorialComponent } from './pages/crear-historial/crear-historial.component';

@NgModule({
  declarations: [



  ],
  imports: [
    SharedModule,
    CommonModule,
    CitasRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    PagesHistorialComponent,
    TableHistorialComponent,
  ]
})
export class CitasModule {}
