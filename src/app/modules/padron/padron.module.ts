import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PadronRoutingModule } from './padron-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '@principal/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PadronRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PadronModule { }
