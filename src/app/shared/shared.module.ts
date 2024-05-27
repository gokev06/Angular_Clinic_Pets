import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/atoms/home/home.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { TituloComponent } from './components/atoms/titulo/titulo.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { PerfilComponent } from './components/molecules/perfil/perfil.component';



@NgModule({
  declarations: [
    HomeComponent,
    LogoComponent,
    TituloComponent,
    HeaderComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule
  ],

  exports:[
    HomeComponent,
    LogoComponent,
    TituloComponent,
    HeaderComponent,
    PerfilComponent
  ]
})
export class SharedModule { }
