import { NgModule } from '@angular/core';

import { LostPetsRoutingModule } from './lost-pets-routing.module';
import { LostPetsComponent } from './lost-pets.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LostPetsRoutingModule,
  ]
})
export class LostPetsModule { }
