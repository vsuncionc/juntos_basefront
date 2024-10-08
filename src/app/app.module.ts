import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 

import localePy from '@angular/common/locales/es-PY';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePy,'es')

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: LOCALE_ID,useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
