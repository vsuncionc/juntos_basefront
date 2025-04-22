import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import localePy from '@angular/common/locales/es-PY';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';    
 
import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '@principal/interceptors/TokenInterceptor';
registerLocaleData(localePy,'es')

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: 
      HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true
    },
    provideAnimationsAsync(),
    {provide: LOCALE_ID,useValue: 'es'},
    provideHttpClient(),
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
