import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';
import { MaterialModule } from '@principal/material/material.module';
import { RouterModule } from '@angular/router';
import { MensajeConfirmacionComponent } from './component/mensaje-confirmacion/mensaje-confirmacion.component';
import { SpinerComponent } from './component/spiner/spiner.component';
import { MensajeComponent } from './component/mensaje/mensaje.component'; 
 

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    MensajeConfirmacionComponent,
    SpinerComponent,
    MensajeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    MenuComponent,
    MensajeConfirmacionComponent,
    SpinerComponent
  ],
  providers: []
})
export class SharedModule { }
