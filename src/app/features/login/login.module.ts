import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        RouterModule,
        SharedModule
    ]
})
export class LoginModule { }
