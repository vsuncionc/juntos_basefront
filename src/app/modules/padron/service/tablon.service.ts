import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envieromen/environment';
import { ApiResponse } from '@principal/model/padron/ApiResponse';
import { TablonBuscarRequest } from '@principal/model/padron/request/TablonBuscarRequest';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TablonService {

  private readonly URL = environment.SERVER_BACK;

  constructor(private http: HttpClient) { }


  buscarTablones<T>(parametros: TablonBuscarRequest): Observable<ApiResponse<T>> {
    return this.http.
    post<ApiResponse<T>>(this.URL+"tablon/buscar", parametros);
  }
}
