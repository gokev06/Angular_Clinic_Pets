import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './features/citas/citas.component';
import { PagehomeComponent } from './features/pagehome/pagehome.component';
import { AdopcionComponent } from './features/adopcion/adopcion.component';
import { NuevaadopcionComponent } from './features/adopcion/pages/nuevaadopcion/nuevaadopcion.component';

const routes: Routes = [
  {path: "citas", component: CitasComponent},
  { path: "" , component: PagehomeComponent},
  {path: "adopcion", component: AdopcionComponent},
  {path:"Nuevo-Publicacion" , component: NuevaadopcionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
