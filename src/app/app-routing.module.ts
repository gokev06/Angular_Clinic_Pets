import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './features/citas/citas.component';
import { PagehomeComponent } from './features/pagehome/pagehome.component';
import { PagesHistorialComponent } from './features/citas/pages/pages-historial/pages-historial.component';

const routes: Routes = [
  {path: "citas", component: CitasComponent},
  { path: "" , component: PagehomeComponent},
  {path: "historial" , component: PagesHistorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
