import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modulos/padron/pages/home/home.component'
 
import { ResumenComponent } from '@modulos/padron/pages/revaluacion/generacion/resumen/resumen.component';
import { PrincipalComponent } from '@modulos/padron/pages/revaluacion/generacion/principal/principal.component';
import { PadronHomeComponent } from '@modulos/padron/pages/padrones/padron-home/padron-home.component';
import { PrincipalPrecierreComponent } from '@modulos/padron/pages/padrones/precierre/principal-precierre/principal-precierre.component';
import { TablonPrincipalComponent } from './pages/tablones/tablon-principal/tablon-principal.component';
import { SessionGuard } from '@principal/guards/session.guard';
 
const routes: Routes = [
  {
    path:'',component:HomeComponent,
    data: { title: 'MODULO REVALUACIONES' },
    canActivate:[SessionGuard] 
  },
  {
    path:'procesar',component:PrincipalComponent,
    data: { title: 'GENERACION PADRON REVALUACION' },
    canActivate:[SessionGuard] 
  },
  {
    path:'resumen/:codigopadron',component:ResumenComponent
    ,data: { title: 'RESUMEN DEL PROCESAMIENTO' },
    canActivate:[SessionGuard] 
  },
  {
    path: 'padron',component:PadronHomeComponent,
    data: { title: 'MODULO VALIDACION HOGARES' },
    canActivate:[SessionGuard] 
  },
  {
    path: 'precierre',component:PrincipalPrecierreComponent,
    data: { title: 'Pre Cierre' },
    canActivate:[SessionGuard] 
  },
  {
    path: 'tablon',component:TablonPrincipalComponent,
    data: { title: 'TABLONES' },
    canActivate:[SessionGuard] 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PadronRoutingModule { }
