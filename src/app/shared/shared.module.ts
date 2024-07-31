import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './components/atoms/home/home.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { TituloComponent } from './components/atoms/titulo/titulo.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { PerfilComponent } from './components/molecules/perfil/perfil.component';
import { InfoFooterComponent } from './components/atoms/info-footer/info-footer.component';
import { InconmapComponent } from './components/atoms/inconlike/inconmap.component';
import { InconphoneComponent } from './components/atoms/inconfacebook/inconphone.component';
import { InconmessageComponent } from './components/atoms/inconyt/inconmessage.component';
import { ContactoInfoComponent } from './components/atoms/contacto-info/contacto-info.component';
import { RouterModule } from "@angular/router";
import { CitasComponent } from '../features/citas/citas.component'; 
import { InputComponent } from './components/atoms/input/input.component';
import { LabelComponent } from './components/atoms/label/label.component';
import { FormularioCitasComponent } from './components/organisms/formulario-citas/formulario-citas.component';
import { HomeHeaderComponent } from './components/organisms/home-header/home-header.component';
import { ContenedoresComponent } from './components/organisms/contenedores/contenedores.component';
import { BoxbigComponent } from './components/organisms/boxbig/boxbig.component';
import { ImgAndtextComponent } from './components/molecules/img-andtext/img-andtext.component';
import { ImgAndtextbigComponent } from './components/molecules/img-andtextbig/img-andtextbig.component';
import { TTiendaComponent } from './components/atoms/t-tienda/t-tienda.component';
import { IconStoreComponent } from './components/atoms/icon-store/icon-store.component';
import { TAdopcionComponent } from './components/atoms/t-adopcion/t-adopcion.component';
import { IconAdopcionComponent } from './components/atoms/icon-adopcion/icon-adopcion.component';
import { IconCitasComponent } from './components/atoms/icon-citas/icon-citas.component';
import { ModalPerfilComponent } from './components/templates/modal-perfil/modal-perfil.component';
import { CarruselComponent } from './components/organisms/carrusel/carrusel.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { CalendarioComponent } from './components/organisms/calendario/calendario.component';
import { HorariosComponent } from './components/organisms/horarios/horarios.component';

import { PagesHistorialComponent } from '../features/citas/pages/pages-historial/pages-historial.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TableHistorialComponent } from '../features/citas/components/table-historial/table-historial.component';
import { PagoTarjetaComponent } from './components/organisms/pago-tarjeta/pago-tarjeta.component';
import { PagoCitaComponent } from '../features/citas/pages/pago-cita/pago-cita.component';
import { PagoinfocitaComponent } from './components/organisms/pagoinfocita/pagoinfocita.component';

import { AlertacitaComponent } from './components/templates/alertacita/alertacita.component';
import { AlertacancelarcitaComponent } from './components/templates/alertacancelarcita/alertacancelarcita.component';
registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    TableHistorialComponent,
    PagesHistorialComponent,
    HomeComponent,
    ContactoInfoComponent,
    PagoCitaComponent,
    LogoComponent,
    TituloComponent,
    HeaderComponent,
    PerfilComponent,
    InfoFooterComponent,
    InconmapComponent,
    InconphoneComponent,
    InconmessageComponent,
    InputComponent,
    LabelComponent,
    FormularioCitasComponent,
    HomeHeaderComponent,
    ContenedoresComponent,
    BoxbigComponent,
    ImgAndtextComponent,
    ImgAndtextbigComponent,
    TTiendaComponent,
    IconStoreComponent,
    TAdopcionComponent,
    IconAdopcionComponent,
    IconCitasComponent,
    ModalPerfilComponent,
    CarruselComponent,
    FooterComponent,
    CalendarioComponent,
    HorariosComponent,
    PagoTarjetaComponent,
    PagoinfocitaComponent,
    AlertacitaComponent,
    AlertacancelarcitaComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule.forRoot([
      { path: 'citas', component: CitasComponent },
  ]),
  ReactiveFormsModule,
  FormsModule
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'es' }

  ],

  exports:[
    HorariosComponent,
    HomeComponent,
    ContactoInfoComponent,
    LogoComponent,
    TituloComponent,
    HeaderComponent,
    PerfilComponent,
    InputComponent,
    LabelComponent,
    FormularioCitasComponent,
    HomeHeaderComponent,
    ContenedoresComponent,
    BoxbigComponent,
    ImgAndtextComponent,
    ImgAndtextbigComponent,
    TTiendaComponent,
    IconStoreComponent,
    TAdopcionComponent,
    IconAdopcionComponent,
    IconCitasComponent,
    CarruselComponent,
    FooterComponent,
    PagesHistorialComponent,
    CalendarioComponent,
    PagoTarjetaComponent,
    PagoinfocitaComponent
  ]
})
export class SharedModule { }
