import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envieromen/environment';
import { ApiResponse } from '@principal/model/padron/ApiResponse';
import { UsuarioLoginRequest } from '@principal/model/padron/request/UsuarioLoginRequest';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.SERVER_BACK;

  constructor(private http: HttpClient) { }

 
   public envioCredenciales<T>(body: UsuarioLoginRequest): Observable<ApiResponse<T>>  {
    return this.http.
    post<ApiResponse<T>>(this.URL+"auth/login", body); 
  } 


}
