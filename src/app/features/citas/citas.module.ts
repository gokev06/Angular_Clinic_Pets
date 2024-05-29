import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { ScopedTituloComponent } from './components/scoped-titulo/scoped-titulo.component';
import { ScopedFormularioComponent } from './components/scoped-formulario/scoped-formulario.component';
import { SharedModule } from '../../shared/shared.module';
import { ScopedFooterComponent } from './components/scoped-footer/scoped-footer.component';


@NgModule({
  declarations: [
    CitasComponent,
    ScopedTituloComponent,
    ScopedFormularioComponent,
    ScopedFooterComponent,
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    ReactiveFormsModule,
    SharedModule, 
  ],
  exports:[
    CitasComponent,
  ]
})
export class CitasModule { }
