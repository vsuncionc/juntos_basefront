import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Ihogares {
  codigoHogar: number;
  idhogar: number;
  periodo: string;
  idcorte: number;
  miemObjetivo: string;
  mescumplimiento: string;
  cumplio: string; 
}

const ELEMENT_DATA: Ihogares[] = [
  {codigoHogar:3936774,  idhogar:5274326, periodo:'202403',idcorte: 291, miemObjetivo:'YMAN JUAREZ MARIA ROSALINA',mescumplimiento: 'MES 2',cumplio:'SI'},
  {codigoHogar:3830396,  idhogar:4964320, periodo:'202403',idcorte: 291,miemObjetivo:'FERNANDEZ FERNANDEZ JORGE LUIS',mescumplimiento: 'MES 1',cumplio:'SI'},
  {codigoHogar:3830396,  idhogar:4964320, periodo:'202403',idcorte: 291,miemObjetivo:'FERNANDEZ FERNANDEZ JORGE LUIS',mescumplimiento: 'MES 2',cumplio:'NO'},
  {codigoHogar:1749805,  idhogar:2438417, periodo:'202403',idcorte: 291,miemObjetivo:'ALVINES YMAN SAMY VIVIANA',mescumplimiento: 'MES 1',cumplio:'SI'},
  {codigoHogar:1749805,  idhogar:2438417, periodo:'202403',idcorte: 291,miemObjetivo:'ALVINES YMAN SAMY VIVIANA',mescumplimiento: 'MES 2',cumplio:'SI'},
  {codigoHogar:1749805,  idhogar:2438417, periodo:'202403',idcorte: 291,miemObjetivo:'ALVINES YMAN MIRELLA CRISLI',mescumplimiento: 'MES 1',cumplio:'SI'},
  {codigoHogar:1749805,  idhogar:2438417, periodo:'202403',idcorte: 291,miemObjetivo:'ALVINES YMAN MIRELLA CRISLI',mescumplimiento: 'MES 2',cumplio:'NO'}
]

@Component({
  selector: 'app-mobjetivos',
  templateUrl: './mobjetivos.component.html',
  styleUrl: './mobjetivos.component.scss'
})
export class MobjetivosComponent implements OnInit {

  displayedColumns: string[] = ['CODIGOHOGAR','IDHOGAR', 'PERIODO', 'IDCORTE', 'MIEMBRO_OBJETIVO', 'CUMPLIMIENTO', 'CUMPLIO'];
  dataSource =new MatTableDataSource<any>(ELEMENT_DATA);

@ViewChild(MatPaginator) paginator!: MatPaginator;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

@Input() codigoRevaluacion:number=0;

  ngOnInit(): void {
    
  }

}
