import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasComponent } from './citas/citas.component';
import { ScopedTituloComponent } from './citas/components/scoped-titulo/scoped-titulo.component';
import { SharedModule } from '../shared/shared.module';
import { ScopedFooterComponent } from './citas/components/scoped-footer/scoped-footer.component';



@NgModule({
  declarations: [
    CitasComponent,
    ScopedTituloComponent,
    ScopedFooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule // Importa ReactiveFormsModule aquí
  ],
  exports:[
    CitasComponent,
    ScopedTituloComponent,

  ]
})
export class FeaturesModule { }
