import { authGuard } from './guards/auth.guard';

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
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { GestionCitasComponent } from './features/citas/pages/gestion-citas/gestion-citas.component';
import { AgendaComponent } from './features/citas/pages/agenda/agenda.component';
import { CrearHistorialComponent } from './features/citas/pages/crear-historial/crear-historial.component';
import { PagoCitaComponent } from './features/citas/pages/pago-cita/pago-cita.component';
import { TiendaComponent } from './features/tienda/tienda.component';
import { AgregarProductoComponent } from './features/tienda/components/agregar-producto/agregar-producto.component';
import { PagesNuevaadopcionComponent } from './features/adopcion/pages/pages-nuevaadopcion/pages-nuevaadopcion.component';
import { InfoAdopcionComponent } from './features/adopcion/pages/info-adopcion/info-adopcion.component';
import { TablaCitasComponent } from './features/citas/pages/tabla-citas/tabla-citas.component';


//rutas de las ventanas
const routes: Routes = [
  {path :"login",component: LoginComponent},
  {path: "citas", component: CitasComponent, canActivate: [authGuard]},
  { path: "home" , component: PagehomeComponent, canActivate: [authGuard]},
  {path: "adopcion", component: AdopcionComponent, canActivate: [authGuard]},
  {path: "register", component: RegistroComponent},
  {path: "", component: PagesHomeRegisterComponent},
  {path: "home-admin", component: PagesHomeAdminComponent, canActivate: [authGuard]},
  {path: "home-vet", component: PagesHomeVetComponent, canActivate: [authGuard]},
  { path: 'historial', component: PagesHistorialComponent, canActivate: [authGuard]},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path:'tienda',component:TiendaComponent},
  {path:'subir-producto',component:AgregarProductoComponent},
  {path: "gestion-citas", component: GestionCitasComponent},
  {path:"agenda" , component: AgendaComponent},
  {path: "crear-historial" , component: CrearHistorialComponent},
  {path: "pago-cita", component:PagoCitaComponent},
  {path: "nueva-adopcion" , component: PagesNuevaadopcionComponent},
  {path:"info-adopcion",component:InfoAdopcionComponent},
  {path: "consul-historial",component:PagesHistorialComponent },
  {path: "table-historial",component: TablaCitasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
