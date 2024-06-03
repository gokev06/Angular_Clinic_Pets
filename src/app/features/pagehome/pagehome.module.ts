import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagehomeRoutingModule } from './pagehome-routing.module';
import { AppRoutingModule } from '../../app-routing.module';
import { PagehomeComponent } from './pagehome.component';
import { CitasComponent } from '../citas/citas.component';
import { RouterModule } from "@angular/router";
import { HomeHeaderComponent } from '../../shared/components/organisms/home-header/home-header.component';


@NgModule({
  declarations: [
    PagehomeComponent,
    CitasComponent,
    HomeHeaderComponent
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
    HomeHeaderComponent
  ]
})
export class PagehomeModule { }
