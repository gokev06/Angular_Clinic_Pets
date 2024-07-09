
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './features/citas/citas.component';
import { PagehomeComponent } from './features/pagehome/pagehome.component';
import { AdopcionComponent } from './features/adopcion/adopcion.component';
import { LoginComponent } from './features/login/login.component';
import { RegistroComponent } from './features/registro/registro.component';

const routes: Routes = [
  {path :"login",component: LoginComponent},
  {path: "citas", component: CitasComponent},
  { path: "" , component: PagehomeComponent},
  {path: "adopcion", component: AdopcionComponent},
  {path: "register", component: RegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
