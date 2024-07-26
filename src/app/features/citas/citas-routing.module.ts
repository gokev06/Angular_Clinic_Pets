import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './citas.component';
import { PagesHistorialComponent } from './pages/pages-historial/pages-historial.component';

const routes: Routes = [
  { path: '', component: CitasComponent },
  { path: 'historial', component: PagesHistorialComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule {}
