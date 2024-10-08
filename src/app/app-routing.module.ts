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
import { SolicitudAdopcionComponent } from './features/adopcion/pages/solicitud-adopcion/solicitud-adopcion.component';
import { AdminAdopcionesComponent } from './features/adopcion/pages/admin-adopciones/admin-adopciones.component';

import { TiendaProductoComponent } from './features/tienda/components/tienda-producto/tienda-producto.component';
import { InfoProductoTiendaComponent } from './features/tienda/pages/info-producto-tienda/info-producto-tienda.component';
import { GestionDeHorariosComponent } from './features/citas/pages/gestion-de-horarios/gestion-de-horarios.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { TiendaAdminComponent } from './features/tienda/pages/tienda-admin/tienda-admin.component';
import { PagoCompraComponent } from './features/tienda/pages/pago-compra/pago-compra.component';
import { InventarioComponent } from './features/tienda/pages/inventario/inventario.component';


import { PagoFormComponent } from './shared/components/templates/pago-form/pago-form.component';
import { LostPetsComponent } from './features/wanted/lost-pets/lost-pets.component';
import { SubirLostPetsComponent } from './shared/components/organisms/formulario-lostPets/subir-lost-pets/subir-lost-pets.component';
//rutas de las ventanas
const routes: Routes = [
  {path :"login",component: LoginComponent}, //ingreso al sistema web
  {path: "citas", component: CitasComponent, canActivate: [authGuard]}, // ventana citas usuario
  { path: "home" , component: PagehomeComponent, canActivate: [authGuard]}, //}, // ventana home de usuario
  {path: "adopcion", component: AdopcionComponent, canActivate: [authGuard]}, // ventana adopcion de usuario
  {path: "register", component: RegistroComponent}, // ingreso al registro
  {path: "", component: PagesHomeRegisterComponent},
  {path: "home-admin", component: PagesHomeAdminComponent, canActivate: [authGuard]},// },

  {path: "home-vet", component: PagesHomeVetComponent, canActivate: [authGuard]},
  { path: 'historial', component: PagesHistorialComponent, canActivate: [authGuard]}, //canActivate: [authGuard]},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path:'subir-producto',component:AgregarProductoComponent}, // completo
  {path: 'editar-producto/:id', component: AgregarProductoComponent},
  {path: "gestion-citas", component: GestionCitasComponent, canActivate: [authGuard]}, // completo
  {path:"agenda" , component: AgendaComponent, canActivate: [authGuard]}, // se supone que es para veterinario
  {path: "gestion-horaios", component: GestionDeHorariosComponent, canActivate: [authGuard]},
  {path: "crear-historial" , component: CrearHistorialComponent, canActivate: [authGuard]},//, canActivate: [authGuard]}, // ya esta crear historial
  {path: "pago-cita", component:PagoCitaComponent}, // se modifica a pago productos
  {path: "nueva-adopcion" , component: PagesNuevaadopcionComponent},  //si esta completa hago endpoints
  {path:"info-adopcion",component:InfoAdopcionComponent}, //  mas o menos, completo
  {path: "consul-historial",component:TablaCitasComponent },  // consulta el historial en vet
  {path: "table-historial",component: TablaCitasComponent, canActivate: [authGuard]}, 
  {path: 'unauthozrized', component: UnauthorizedComponent},
  {path:'tienda',component:TiendaComponent, canActivate: [authGuard]},
  {path: 'info-producto', component:InfoProductoTiendaComponent},
  {path: 'tienda-producto', component: TiendaProductoComponent},
  {path: 'gestion-veterinarios', component:UsuariosComponent, canActivate: [authGuard]},
  {path: 'tienda-admin',component:TiendaAdminComponent, canActivate: [authGuard]},
  {path: "ver-adopcion",component: SolicitudAdopcionComponent },
  {path: "pago-compra", component: PagoCompraComponent},
  {path:"admin-adopciones", component: AdminAdopcionesComponent, canActivate: [authGuard]},
  {path: "solicitud_adopcion", component: SolicitudAdopcionComponent},
  {path: 'inventario', component: InventarioComponent, canActivate: [authGuard] },
  {path: "pago-form", component: PagoFormComponent},
  {path: "solicitudes_adopcion", component: SolicitudAdopcionComponent},
  {path: "lost-pets", component: LostPetsComponent, canActivate: [authGuard]},
  { path: 'subir-lost-pets/:IdUsuario', component: SubirLostPetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//mergue
