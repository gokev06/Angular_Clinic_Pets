
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './features/citas/citas.component';
import { PagehomeComponent } from './features/pagehome/pagehome.component';
import { AdopcionComponent } from './features/adopcion/adopcion.component';
import { LoginComponent } from './features/login/login.component';
import { RegistroComponent } from './features/registro/registro.component';
import { PagesHomeRegisterComponent } from './features/pagehome/pages/pages-home-register/pages-home-register.component';
import { PagesHomeAdminComponent } from './features/pagehome/pages/pages-home-admin/pages-home-admin.component';
import { PagesHomeVetComponent } from './features/pagehome/pages/pages-home-vet/pages-home-vet.component';
import { PagesHistorialComponent } from './features/citas/pages/pages-historial/pages-historial.component';

//rutas de las ventanas 
const routes: Routes = [
  {path :"login",component: LoginComponent},
  {path: "citas", component: CitasComponent},
  { path: "home" , component: PagehomeComponent},
  {path: "adopcion", component: AdopcionComponent},
  {path: "register", component: RegistroComponent},
  {path: "", component: PagesHomeRegisterComponent},
  {path: "home-admin", component: PagesHomeAdminComponent},
  {path: "home-vet", component: PagesHomeVetComponent},
  { path: 'historial', component: PagesHistorialComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
