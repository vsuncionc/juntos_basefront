import { ListaRevaluacionesService } from '@modulos/padron/service/lista-revaluaciones.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListaMoPorRevaluacionResponse } from '@principal/model/padron/response/ListaMoPorRevaluacionResponse';
import { RevaluacionRequest } from '@principal/model/padron/request/RevaluacionRequest';
import { ListaHogaresRevisionResponse } from '@principal/model/padron/response/ListaHogaresRevisionResponse';

@Component({
  selector: 'app-mobjetivos',
  templateUrl: './mobjetivos.component.html',
  styleUrl: './mobjetivos.component.scss'
})
export class MobjetivosComponent implements OnInit {



  displayedColumns: string[] = ['CODIGOHOGAR','IDHOGAR', 'PERIODO', 'IDCORTE', 'MIEMBRO_OBJETIVO', 'CUMPLIO_MES_1', 'CUMPLIO_MES_2'];
  dataSource =new MatTableDataSource<ListaMoPorRevaluacionResponse>();

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

@Input() codigoRevaluacion:number=0;

constructor(
  private revaluacionService:ListaRevaluacionesService
){}

  ngOnInit(): void {
    this.listarMoPorRevaluacion();
  }   

  listarMoPorRevaluacion(){
    const request = {
      codigoRevaluacion: this.codigoRevaluacion,
      tipobusqueda : "",
      criterio : "",
      grupoesquema : "" 
    } as RevaluacionRequest
   this.revaluacionService.listarMoPorRevaluacion<ListaHogaresRevisionResponse>(request).
    subscribe({
      next: (data) => {
        if(data.status === '1'){
          console.log("---- grupo MO"+data.data);
        }else{
          console.log('error al consultar');
        }
      },
      error: (error) => {
      console.error('Error en la petición:', error);
     }
    });
  }


}
