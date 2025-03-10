import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Ihogares {
  codigoHogar: number;
  idhogar: number;
  idcorte: number;
  periodo: string;
  dni: string;
  titular: string; 
}


const ELEMENT_DATA: Ihogares[] = [
  { codigoHogar:3936774, idhogar: 5274326, idcorte: 291, periodo: '202403', dni: '05356440',  titular: 'ACHO PEÑA BERSABI'},
  { codigoHogar:3830396, idhogar: 4964320, idcorte: 291, periodo: '202403', dni: '43046590',  titular: 'ACUÑA EULOGIO YESSICA MIRIAN'},
  { codigoHogar:1749805, idhogar: 2438417, idcorte: 291, periodo: '202403', dni: '47087189',  titular: 'AGUINDA CAPINOA LEYLA'} 
  
];

@Component({
  selector: 'app-hogares',
  templateUrl: './hogares.component.html',
  styleUrl: './hogares.component.scss'
})
export class HogaresComponent  implements OnInit{

  @Input() codigoRevaluacion:number=0;

  displayedColumns: string[] = ['CODIGOHOGAR','IDHOGAR', 'IDCORTE', 'PERIODO', 'DNI', 'TITULAR'];
  dataSource =new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void { 
  }

}
