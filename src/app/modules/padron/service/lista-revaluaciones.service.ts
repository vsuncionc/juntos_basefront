import { HttpClient } from '@angular/common/http';
import { environment } from '@envieromen/environment';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@principal/model/padron/ApiResponse';
import { Observable } from 'rxjs';
import { RevaluacionRequest } from '@principal/model/padron/request/RevaluacionRequest';
import { RevaluacionSeleccionadaRevPostRequest } from '@principal/model/padron/request/RevaluacionSeleccionadaRevPostRequest';
import { PadronBuscarRequest } from '@principal/model/padron/request/PadronBuscarRequest';


@Injectable({
  providedIn: 'root'
})
export class ListaRevaluacionesService {

  private readonly URL = environment.SERVER_BACK;
  private lsRev: number[] = [];

  constructor(private http: HttpClient) { }


  obtenerTodasRevaluaciones<T>(payload: RevaluacionRequest): Observable<ApiResponse<T>> {
    return this.http.
    post<ApiResponse<T>>(this.URL+"revaluacion/buscar", payload);
  }

  listarGrupoEsquema<T>(parametro:string): Observable<ApiResponse<T>> {
    return this.http.
    get<ApiResponse<T>>(this.URL+`genericos/listarcombo?parametro=${parametro}`);
  }

  listaHogaresPorRevaluacion<T>(Parametro:RevaluacionRequest) : Observable<ApiResponse<T>>{
    return this.http.
    post<ApiResponse<T>>(this.URL+`revaluacion/listarMiembrosHogarRevaluacion`,Parametro);
  }

  listarMoPorRevaluacion<T>(Parametro:RevaluacionRequest): Observable<ApiResponse<T>>{
    return this.http.
    post<ApiResponse<T>>(this.URL+`revaluacion/listarMiembrosObjetivosRevaluacion`,Parametro);
  }

  listarHogarRevPostSeleccionados<T>(parametro:RevaluacionSeleccionadaRevPostRequest) :Observable<ApiResponse<T>>{
    return this.http.
    post<ApiResponse<T>>(this.URL+`revaluacion/listrevseleccionadas`,parametro);
  }
  
  listarMoRevPostSeleccionados<T>(parametro:RevaluacionSeleccionadaRevPostRequest):Observable<ApiResponse<T>>{
    return this.http.
    post<ApiResponse<T>>(this.URL+`revaluacion/listmorevseleccionadas`,parametro);
  }

  ListarRevaluacionesPorPadron<T>(parametro:PadronBuscarRequest):Observable<ApiResponse<T>>{
    return this.http.
    post<ApiResponse<T>>(this.URL+`revaluacion/listarevalporpadron`,parametro);
  }


  setDatosRev(lsRev: number[]) {
    this.lsRev = lsRev;
  }

  getDatosRev(): number[] {
    return this.lsRev;
  }


}
