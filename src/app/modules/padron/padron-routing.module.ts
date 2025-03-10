import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modulos/padron/pages/home/home.component'
 
import { ResumenComponent } from '@modulos/padron/pages/revaluacion/generacion/resumen/resumen.component';
import { PrincipalComponent } from '@modulos/padron/pages/revaluacion/generacion/principal/principal.component';
import { PadronHomeComponent } from '@modulos/padron/pages/padrones/padron-home/padron-home.component';
import { PrincipalPrecierreComponent } from '@modulos/padron/pages/padrones/precierre/principal-precierre/principal-precierre.component';
const routes: Routes = [
  {
    path:'',component:HomeComponent,
    data: { title: 'MODULO REVALUACIONES' }
  },
  {
    path:'procesar',component:PrincipalComponent,
    data: { title: 'PROCESAMIENTO REVALIDACIONES' }
  },
  {
    path:'resumen/:codigopadron',component:ResumenComponent
    ,data: { title: 'RESUMEN DEL PROCESAMIENTO' }
  },
  {
    path: 'padron',component:PadronHomeComponent,
    data: { title: 'MODULO PADRON REVALUACIONES DE HOGARES' }
  },
  {
    path: 'precierre',component:PrincipalPrecierreComponent,
    data: { title: 'MODULO 5' }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PadronRoutingModule { }
