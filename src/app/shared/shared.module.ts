import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './components/atoms/home/home.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { TituloComponent } from './components/atoms/titulo/titulo.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { PerfilComponent } from './components/molecules/perfil/perfil.component';
import { InfoFooterComponent } from './components/atoms/info-footer/info-footer.component';
import { InconmapComponent } from './components/atoms/inconmap/inconmap.component';
import { InconphoneComponent } from './components/atoms/inconphone/inconphone.component';
import { InconmessageComponent } from './components/atoms/inconmessage/inconmessage.component';
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


@NgModule({
  declarations: [
    HomeComponent,
    ContactoInfoComponent,
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
    ModalPerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'citas', component: CitasComponent },
  ]),
  ReactiveFormsModule
  ],

  exports:[
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
    IconCitasComponent
  ]
})
export class SharedModule { }
