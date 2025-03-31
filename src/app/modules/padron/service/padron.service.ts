import { InformacionCabeceraPreCierreResponse } from './../../../core/model/padron/response/InformacionCabeceraPreCierreResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envieromen/environment';
import { ApiResponse } from '@principal/model/padron/ApiResponse';
import { PadronBuscarHogaresRequest } from '@principal/model/padron/request/PadronBuscarHogaresRequest';
import { PadronBuscarRequest } from '@principal/model/padron/request/PadronBuscarRequest';
import { PadronPreCierreRequest } from '@principal/model/padron/request/PadronPreCierreRequest';
import { PadronProcesarRequest } from '@principal/model/padron/request/PadronProcesarRequest';
import { PadronSeleccionHogaresRequest } from '@principal/model/padron/request/PadronSeleccionHogaresRequest'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PadronService {

private readonly URL = environment.SERVER_BACK;
private lsHgSel: number[] = [];
constructor(private http: HttpClient) { }

generarPadronRevaluacion<T>(parametros: PadronProcesarRequest): Observable<ApiResponse<T>> {
  return this.http.
  post<ApiResponse<T>>(this.URL+"padron/procesarPadron", parametros); 
}

resumenPadronGenerado<T>(parametros: PadronBuscarRequest): Observable<ApiResponse<T>>{
   return this.http.
    post<ApiResponse<T>>(this.URL+"padron/resumengeneracion", parametros);
}

descargaReportePadronGenerado(params: number): Observable<Blob>{
  return this.http.get(this.URL+`padron/generarexcelpadron?id=${params}`, {
    responseType: 'blob'
 });
}

buscarHogaresPadron<T>(parametros: PadronBuscarHogaresRequest): Observable<ApiResponse<T>>{
  return this.http.
  post<ApiResponse<T>>(this.URL+"padron/buscarhogarespadron", parametros);
}

listarGrupoEsquema<T>(parametro:string): Observable<ApiResponse<T>> {
  return this.http.
  get<ApiResponse<T>>(this.URL+`genericos/listarcombo?parametro=${parametro}`);
}

listarPeriodos<T>(): Observable<ApiResponse<T>> {
  return this.http.
  get<ApiResponse<T>>(this.URL+"genericos/listarcomboperiodo");
}

 
listarHogarSeleccionadoPrecierre<T>(parametro:PadronSeleccionHogaresRequest):Observable<ApiResponse<T>>{
    return this.http.
    post<ApiResponse<T>>(this.URL+`padron/listaselecthogarespadron`,parametro);
}


generarPrecierre<T>(parametro:PadronSeleccionHogaresRequest):Observable<ApiResponse<T>>{
  return this.http.
  post<ApiResponse<T>>(this.URL+`padron/generarprecierre`,parametro);
}

informacionCabeceraResumenPreCierreResponse<T>(parametro:PadronPreCierreRequest):Observable<ApiResponse<T>>{
  return this.http.
  post<ApiResponse<T>>(this.URL+`padron/informacionprecierre`,parametro);
}

listaHogaresAptosPrecierre<T>(parametro:PadronPreCierreRequest):Observable<ApiResponse<T>>{
  return this.http.
  post<ApiResponse<T>>(this.URL+`padron/listahogaresvalprecierre`,parametro);
}

listaHogaresSuspendidosPrecierre<T>(parametro:PadronPreCierreRequest):Observable<ApiResponse<T>>{
  return this.http.
  post<ApiResponse<T>>(this.URL+`padron/listahogaresusprecierre`,parametro);
}

generarCierre<T>(parametro:PadronPreCierreRequest):Observable<ApiResponse<T>>{
  return this.http.
  post<ApiResponse<T>>(this.URL+`padron/generarcierre`,parametro);
}

descargaReporteHogaresAptos(params: number): Observable<Blob>{
  return this.http.get(this.URL+`padron/generarexcelcierre?id=${params}`, {
    responseType: 'blob'
 });
}

setDatoslsHgSel(lsHgSel: number[]){
  this.lsHgSel = lsHgSel;
}

getDatoslsHgSel(): number[] {
  return this.lsHgSel;
}


}
