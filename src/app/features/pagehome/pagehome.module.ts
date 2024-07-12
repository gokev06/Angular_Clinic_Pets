import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagehomeRoutingModule } from './pagehome-routing.module';
import { PagehomeComponent } from './pagehome.component';
import { CitasComponent } from '../citas/citas.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from '../../shared/shared.module';
import { HeaderHomeComponent } from './components/header-home/header-home.component';



@NgModule({
  declarations: [
    HeaderHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagehomeRoutingModule,
    RouterModule.forRoot([
      { path: 'citas', component: CitasComponent },
  ]),
  ],
  exports:[
    HeaderHomeComponent
  ]
})
export class PagehomeModule { }