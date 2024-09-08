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
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
