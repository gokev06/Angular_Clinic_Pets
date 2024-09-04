import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { GestionVeterinariosComponent } from './pages/gestion-veterinarios/gestion-veterinarios.component';
import { FeaturesModule } from '../features.module';


@NgModule({
  declarations: [
    //GestionVeterinariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    
  ]
})
export class UsuariosModule { }
