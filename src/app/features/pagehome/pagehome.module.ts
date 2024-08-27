import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagehomeRoutingModule } from './pagehome-routing.module';
import { CitasComponent } from '../citas/citas.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from '../../shared/shared.module';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { ContenedoresAdminComponent } from './components/contenedores-admin/contenedores-admin.component';
import { ContenedoresVetComponent } from './components/contenedores-vet/contenedores-vet.component';



@NgModule({
  declarations: [
    HeaderHomeComponent,
    ContenedoresAdminComponent,
    ContenedoresVetComponent,
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
    HeaderHomeComponent,
    ContenedoresAdminComponent,
    ContenedoresVetComponent,
  ]
})
export class PagehomeModule { }