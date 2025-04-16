import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 

import localePy from '@angular/common/locales/es-PY';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'; 
import { inyectarTokenInterceptor } from '@principal/interceptors/inyectar-token.interceptor';
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
    {provide: LOCALE_ID,useValue: 'es'},
    provideHttpClient(),
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
