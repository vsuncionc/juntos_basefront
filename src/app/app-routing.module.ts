import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', loadChildren: ()=>import('@modulos/auth/auth.module').then(m=>m.AuthModule)},
  { path: 'principal', loadChildren: ()=>import('@modulos/dashboard/dashboard.module').then(m=>m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
