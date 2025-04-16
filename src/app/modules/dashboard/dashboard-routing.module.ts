import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { SessionGuard } from '@principal/guards/session.guard';

const routes: Routes = [
  {
    path: 'usuario',
    loadChildren: ()=>import('@modulos/users/users.module').then(m => m.UsersModule),
    data: { title: 'MODULO USUARIO' },
    canActivate:[SessionGuard] 
  },
  {
    path: 'revaluacion',
    loadChildren: ()=>import('@modulos/padron/padron.module').then(m=>m.PadronModule),
    data: { title: 'MODULO REVALUACIONES' },
    canActivate:[SessionGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
