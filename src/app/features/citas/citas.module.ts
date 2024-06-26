import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { SharedModule } from '../../shared/shared.module';
import { PagesHistorialComponent } from './pages/pages-historial/pages-historial.component';
import { TableHistorialComponent } from './components/table-historial/table-historial.component';
import { ScopedTableHistorialComponent } from './components/scoped-table-historial/scoped-table-historial.component';


@NgModule({
  declarations: [
    PagesHistorialComponent,
    TableHistorialComponent,
    ScopedTableHistorialComponent,
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    PagesHistorialComponent,
    TableHistorialComponent
  ]
})
export class CitasModule { }
