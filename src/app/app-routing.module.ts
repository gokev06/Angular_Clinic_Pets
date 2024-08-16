
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './features/citas/citas.component';
import { PagehomeComponent } from './features/pagehome/pagehome.component';
import { AdopcionComponent } from './features/adopcion/adopcion.component';
import { LoginComponent } from './features/login/login.component';
import { RegistroComponent } from './features/registro/registro.component';
import { PagesNuevaadopcionComponent } from './features/adopcion/pages/pages-nuevaadopcion/pages-nuevaadopcion.component';
import { InfoAdopcionComponent } from './features/adopcion/pages/info-adopcion/info-adopcion.component';

const routes: Routes = [
  {path :"login",component: LoginComponent},
  {path: "citas", component: CitasComponent},
  { path: "" , component: PagehomeComponent},
  {path: "adopcion", component: AdopcionComponent},
  {path: "register", component: RegistroComponent},
  {path: "nueva-adopcion" , component: PagesNuevaadopcionComponent},
  {path:"info-adopcion",component:InfoAdopcionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
