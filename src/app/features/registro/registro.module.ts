import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        RegistroComponent
    ],
    imports: [
        CommonModule,
        RegistroRoutingModule,
        SharedModule
    ]
})
export class RegistroModule { }
