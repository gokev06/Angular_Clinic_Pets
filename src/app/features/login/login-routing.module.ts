import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component, Renderer2, OnInit } from '@angular/core';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
