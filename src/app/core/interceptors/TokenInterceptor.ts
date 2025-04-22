import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor( 
    private cookieService: CookieService 
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the authorization header
    const token = this.cookieService.get("token"); // TODO: Replace with dynamic token retrieval logic
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
     console.log('Intercepted request:', clonedRequest);
    // Pass the cloned request instead of the original request to the next handler
    return next.handle(clonedRequest);
  }
}
