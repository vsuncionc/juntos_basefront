import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';
import { MaterialModule } from '@principal/material/material.module';



@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FooterComponent,
    MenuComponent
  ] 
})
export class SharedModule { }
