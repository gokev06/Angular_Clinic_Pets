import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagehomeRoutingModule } from './pagehome-routing.module';
import { AppRoutingModule } from '../../app-routing.module';
import { PagehomeComponent } from './pagehome.component';
import { CitasComponent } from '../citas/citas.component';
import { RouterModule } from "@angular/router";




@NgModule({
  declarations: [
    PagehomeComponent,
    CitasComponent,
   
  ],
  imports: [
    CommonModule,
    PagehomeRoutingModule,
    RouterModule.forRoot([
      { path: 'citas', component: CitasComponent },
  ]),
  ],
  exports:[
    PagehomeComponent,
   
  ]
})
export class PagehomeModule { }
