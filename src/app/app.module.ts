import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FeaturesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
