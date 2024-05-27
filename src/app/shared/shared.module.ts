import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/atoms/home/home.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { TituloComponent } from './components/atoms/titulo/titulo.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { PerfilComponent } from './components/molecules/perfil/perfil.component';
import { InfoFooterComponent } from './components/atoms/info-footer/info-footer.component';
import { InconmapComponent } from './components/atoms/inconmap/inconmap.component';
import { InconphoneComponent } from './components/atoms/inconphone/inconphone.component';
import { InconmessageComponent } from './components/atoms/inconmessage/inconmessage.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { ContactoInfoComponent } from './components/atoms/contacto-info/contacto-info.component';



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
    FooterComponent,
  
  ],
  imports: [
    CommonModule
  ],

  exports:[
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LogoComponent,
    TituloComponent,
    HeaderComponent,
    PerfilComponent
  ]
})
export class SharedModule { }
