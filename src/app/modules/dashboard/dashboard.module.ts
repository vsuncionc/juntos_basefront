import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '@compartido/shared.module';
import { MaterialModule } from '@principal/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
