import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modulos/dashboard/pages/home/home.component';

const routes: Routes = [
  { path: '',redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', loadChildren: ()=>import('@modulos/auth/auth.module').then(m=>m.AuthModule)},
  { 
    path: 'principal', 
    component: HomeComponent,
    loadChildren: ()=>import('@modulos/dashboard/dashboard.module').then(m=>m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
