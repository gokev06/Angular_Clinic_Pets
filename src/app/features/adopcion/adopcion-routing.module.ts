import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoAdopcionComponent } from './pages/info-adopcion/info-adopcion.component';

const routes: Routes = [
  { path: 'info-adopcion/:id', component: InfoAdopcionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopcionRoutingModule { }
