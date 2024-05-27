import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasComponent } from './citas/citas.component';
import { ScopedTituloComponent } from './citas/components/scoped-titulo/scoped-titulo.component';
import { ScopedFormularioComponent } from './citas/components/scoped-formulario/scoped-formulario.component';



@NgModule({
  declarations: [
    CitasComponent,
    ScopedTituloComponent,
    ScopedFormularioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule // Importa ReactiveFormsModule aquí
  ],
  exports:[
    CitasComponent,
    ScopedTituloComponent,
    ScopedFormularioComponent
  ]
})
export class FeaturesModule { }
