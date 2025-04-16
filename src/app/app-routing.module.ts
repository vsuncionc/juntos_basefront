import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modulos/dashboard/pages/home/home.component'; 
import { SessionGuard } from '@principal/guards/session.guard';
 

const routes: Routes = [
  { path: '',redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', loadChildren: ()=>import('@modulos/auth/auth.module').then(m=>m.AuthModule)},
  { 
    path: 'principal', // path: 'principal', 
    component: HomeComponent,
    loadChildren: ()=>import('@modulos/dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate:[SessionGuard] 
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
