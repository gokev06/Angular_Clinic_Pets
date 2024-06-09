import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CitasComponent,
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
