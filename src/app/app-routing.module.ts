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
import { TiendaComponent } from './features/tienda/tienda.component';
import { AgregarProductoComponent } from './features/tienda/components/agregar-producto/agregar-producto.component';
import { TiendaProductoComponent } from './features/tienda/components/tienda-producto/tienda-producto.component';
import { InfoProductoTiendaComponent } from './features/tienda/pages/info-producto-tienda/info-producto-tienda.component';
import { TiendaAdminComponent } from './features/tienda/pages/tienda-admin/tienda-admin.component';

//rutas de las ventanas
const routes: Routes = [
  {path :"login",component: LoginComponent},
  {path: "citas", component: CitasComponent, canActivate: [authGuard]},
  { path: "home" , component: PagehomeComponent, canActivate: [authGuard]},
  {path: "adopcion", component: AdopcionComponent, canActivate: [authGuard]},
  {path: "register", component: RegistroComponent},
  {path: "", component: PagesHomeRegisterComponent},
  {path: "home-admin", component: PagesHomeAdminComponent},
  {path: "home-vet", component: PagesHomeVetComponent},
  { path: 'historial', component: PagesHistorialComponent, canActivate: [authGuard]},
  {path: 'unauthozrized', component: UnauthorizedComponent},
  {path:'tienda',component:TiendaComponent},
  {path:'subir-producto',component:AgregarProductoComponent},
  {path: 'info-producto', component:InfoProductoTiendaComponent},
  {path: 'tienda-admin',component:TiendaAdminComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
