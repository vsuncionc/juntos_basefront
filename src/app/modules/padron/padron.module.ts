import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PadronRoutingModule } from './padron-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '@principal/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormrevaluacionComponent } from '@modulos/padron/pages/revaluacion/formrevaluacion/formrevaluacion.component';
import { FormrevalupadronComponent } from '@modulos/padron/pages/revaluacion/formrevalupadron/formrevalupadron.component';
import { InformacionComponent } from './pages/revaluacion/detalle/informacion/informacion.component';
import { HogaresComponent } from './pages/revaluacion/detalle/hogares/hogares.component';
import { MobjetivosComponent } from './pages/revaluacion/detalle/mobjetivos/mobjetivos.component';
import { PrincipalComponent } from './pages/revaluacion/generacion/principal/principal.component';
import { ListahogaresComponent } from './pages/revaluacion/generacion/listahogares/listahogares.component';
import { ListamobjetivoComponent } from './pages/revaluacion/generacion/listamobjetivo/listamobjetivo.component';
import { SharedModule } from "@compartido/shared.module";
import { ResumenComponent } from './pages/revaluacion/generacion/resumen/resumen.component';
import { PadronHomeComponent } from './pages/padrones/padron-home/padron-home.component';
import { PrincipalPrecierreComponent } from './pages/padrones/precierre/principal-precierre/principal-precierre.component';
import { HgSeleccionPrecierreComponent } from './pages/padrones/precierre/hg-seleccion-precierre/hg-seleccion-precierre.component';
import { HogaresActosComponent } from './pages/padrones/precierre/hogares-actos/hogares-actos.component';
import { HogareSuspendidosComponent } from './pages/padrones/precierre/hogare-suspendidos/hogare-suspendidos.component';
import { ResumenPrecierreComponent } from './pages/padrones/precierre/resumen-precierre/resumen-precierre.component'; 
 

@NgModule({
  declarations: [
    HomeComponent,
    FormrevaluacionComponent,
    FormrevalupadronComponent,
    InformacionComponent,
    HogaresComponent,
    MobjetivosComponent,
    PrincipalComponent,
    ListahogaresComponent,
    ListamobjetivoComponent,
    ResumenComponent,
    PadronHomeComponent,
    PrincipalPrecierreComponent,
    HgSeleccionPrecierreComponent,
    HogaresActosComponent,
    HogareSuspendidosComponent,
    ResumenPrecierreComponent 
  ],
  imports: [
    CommonModule,
    PadronRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class PadronModule { }
