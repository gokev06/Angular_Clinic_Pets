import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { ScopedTituloComponent } from './components/scoped-titulo/scoped-titulo.component';
import { ScopedFormularioComponent } from './components/scoped-formulario/scoped-formulario.component';


@NgModule({
  declarations: [
    CitasComponent,
    ScopedTituloComponent,
    ScopedFormularioComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    ReactiveFormsModule // Importa ReactiveFormsModule aquí
  ],
  exports:[
    CitasComponent
  ]
})
export class CitasModule { }
