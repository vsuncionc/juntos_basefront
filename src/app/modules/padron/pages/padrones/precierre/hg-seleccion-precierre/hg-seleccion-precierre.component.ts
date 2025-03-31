import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HogaresPadronRevaluacionResponse } from '@principal/model/padron/response/HogaresPadronRevaluacionResponse';

 
@Component({
  selector: 'app-hg-seleccion-precierre',
  templateUrl: './hg-seleccion-precierre.component.html',
  styleUrl: './hg-seleccion-precierre.component.scss'
})
export class HgSeleccionPrecierreComponent implements OnInit {

  @Input() lsHogarSeleccionadoVistaPrevia : HogaresPadronRevaluacionResponse[] = [];

  displayedColumns: string[] = ['DEPARTAMENTO','ESQUEMA', 'IDCORTE', 'IDHOGAR', 'CODIGOHOGAR', 'PERIODO', 'FPADRON', 'TITULAR', 'CUENTA', 'CODIGO_PADRON','MONTO'];
  dataSource =new MatTableDataSource<any>();
   color = '#AF261A'
  
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    

  ngOnInit(): void {
    this.obtenerHogaresSeleccionadosVistaPrevia();
  }

  obtenerHogaresSeleccionadosVistaPrevia(){
   console.log("lsHogarSeleccionadoVistaPrevia",this.lsHogarSeleccionadoVistaPrevia.length);
   this.dataSource =new MatTableDataSource<HogaresPadronRevaluacionResponse>(this.lsHogarSeleccionadoVistaPrevia);
   setTimeout(() => {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
 
}

}
