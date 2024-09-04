import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitasComponent } from './citas/citas.component';
import { SharedModule } from '../shared/shared.module';
import { PagehomeComponent } from './pagehome/pagehome.component';
import { AdopcionComponent } from './adopcion/adopcion.component';
import { CardsadopcionComponent } from './adopcion/components/cardsadopcion/cardsadopcion.component';
import { HeaderadopcionComponent } from './adopcion/components/headeradopcion/headeradopcion.component';
import { CardsComponent } from './adopcion/components/cards/cards.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PagesHomeRegisterComponent } from './pagehome/pages/pages-home-register/pages-home-register.component';
import { PagesHomeAdminComponent } from './pagehome/pages/pages-home-admin/pages-home-admin.component';
import { PagesHomeVetComponent } from './pagehome/pages/pages-home-vet/pages-home-vet.component';
import { PagehomeModule } from './pagehome/pagehome.module';
import { GestionCitasComponent } from './citas/pages/gestion-citas/gestion-citas.component';
import { AgendaComponent } from './citas/pages/agenda/agenda.component';
import { CrearHistorialComponent } from './citas/pages/crear-historial/crear-historial.component';
import { PagesNuevaadopcionComponent } from './adopcion/pages/pages-nuevaadopcion/pages-nuevaadopcion.component';
import { FormularioAdopcionComponent } from './adopcion/components/formulario-adopcion/formulario-adopcion.component';
import { CardformularioComponent } from './adopcion/components/cardformulario/cardformulario.component';
import { InfoAdopcionComponent } from './adopcion/pages/info-adopcion/info-adopcion.component';
import { TablaCitasComponent } from './citas/pages/tabla-citas/tabla-citas.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CardComponent } from './tienda/components/card-tienda/card.component';
import { AgregarProductoComponent } from './tienda/components/agregar-producto/agregar-producto.component';
import { TiendaProductoComponent } from './tienda/components/tienda-producto/tienda-producto.component';
import { InfoProductoTiendaComponent } from './tienda/pages/info-producto-tienda/info-producto-tienda.component';

import { InfoTComponent } from './tienda/components/filtro/info-t.component';
import { FiltroTiendaComponent } from './tienda/components/filtro-tienda/filtro-tienda.component';
import { HeaderTiendaComponent } from './tienda/components/header-tienda/header-tienda.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GestionVeterinariosComponent } from './usuarios/pages/gestion-veterinarios/gestion-veterinarios.component';
import { TiendaAdminComponent } from './tienda/pages/tienda-admin/tienda-admin.component';
import { CardAdminComponent } from './tienda/components/card-admin/card-admin.component';
@NgModule({
  declarations: [
    GestionCitasComponent,
    CardformularioComponent,
    CitasComponent,
    PagehomeComponent,
    AdopcionComponent,
    CardsadopcionComponent,
    HeaderadopcionComponent,
    CardsComponent,
    LoginComponent,
    RegistroComponent,
    PagesHomeRegisterComponent,
    PagesHomeAdminComponent,
    PagesHomeVetComponent,
    AgendaComponent,
    CrearHistorialComponent,
    TiendaComponent,
    CardComponent,
    AgregarProductoComponent,
    TiendaProductoComponent,
    InfoProductoTiendaComponent,
    InfoTComponent,
    FiltroTiendaComponent,
    PagesNuevaadopcionComponent,
    FormularioAdopcionComponent,
    InfoAdopcionComponent,
    GestionVeterinariosComponent,
    HeaderTiendaComponent,
    TablaCitasComponent,
    UsuariosComponent,
    TiendaAdminComponent,
    CardAdminComponent

  ],
  imports: [
    UsuariosModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PagehomeModule
  ],
  exports: [
    CitasComponent,
    PagehomeComponent,
    AdopcionComponent,
    CardsadopcionComponent,
    HeaderadopcionComponent,
    CardsComponent,
    LoginComponent,
    RegistroComponent,
    PagesHomeRegisterComponent,
    PagesHomeAdminComponent,
    PagesHomeVetComponent,
    GestionCitasComponent,
    AgendaComponent,
    TiendaComponent,
    CardComponent,
    AgregarProductoComponent,
    TablaCitasComponent,
    TiendaProductoComponent,
    InfoProductoTiendaComponent,

  ]
})
export class FeaturesModule {}
