import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { ScopedTituloComponent } from './components/scoped-titulo/scoped-titulo.component';


@NgModule({
  declarations: [
    CitasComponent,
    ScopedTituloComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule
  ]
})
export class CitasModule { }
