import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CitasRoutingModule } from './citas-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PagesHistorialComponent } from './pages/pages-historial/pages-historial.component';
import { ScopedTableHistorialComponent } from './components/scoped-table-historial/scoped-table-historial.component';
import { CitasComponent } from './citas.component';


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
  ]
})
export class CitasModule {}
