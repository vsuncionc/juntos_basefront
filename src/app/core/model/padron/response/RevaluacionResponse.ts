export interface RevaluacionResponse {
  id: number;
  expediente: string;
  documento: string;
  fechaDocumento: string;
  fechaProceso: string;
  descripcion: string;
  estado: string;
  cantidadHogares: number;
  tipoPago: string;
  tipoEsquema: string;
  descripCorta: string;
}