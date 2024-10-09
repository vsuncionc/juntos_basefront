import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'usuario',
    loadChildren: ()=>import('@modulos/users/users.module').then(m => m.UsersModule),
    data: { title: 'MODULO USUARIO' }
  },
  {
    path: 'padron',
    loadChildren: ()=>import('@modulos/padron/padron.module').then(m=>m.PadronModule),
    data: { title: 'MODULO PADRON' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
