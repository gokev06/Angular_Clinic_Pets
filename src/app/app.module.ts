import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CalendarioComponent } from './shared/components/organisms/calendario/calendario.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // Necesario para ngx-toastr
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // Posición de la alerta
      timeOut: 5000, // Duración en milisegundos
      progressBar: true, // Muestra la barra de progreso
      preventDuplicates: true, // Evita duplicados
    }), // Configura ToastrModule
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
