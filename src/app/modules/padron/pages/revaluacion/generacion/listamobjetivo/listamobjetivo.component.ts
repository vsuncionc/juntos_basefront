import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface IhogaresMo {
  codigohogar:number;
  idhogar:number;
  periodo:string;
  idcorte:number;
  mobjetivo:string;
  mescumplimiento:string;
  cumplimiento:string
}
 
const ELEMENT_DATA: IhogaresMo[] = [
  {codigohogar:3936774,idhogar:5274326,periodo:'202403',idcorte:291,mobjetivo:'YMAN JUAREZ MARIA ROSALINA',mescumplimiento:'MES 1',cumplimiento:'SI'},
  {codigohogar:3936774,idhogar:5274326,periodo:'202403',idcorte:291,mobjetivo:'YMAN JUAREZ MARIA ROSALINA',mescumplimiento:'MES 2',cumplimiento:'SI'},
  {codigohogar:3830396,idhogar:4964320,periodo:'202403',idcorte:291,mobjetivo:'FERNANDEZ FERNANDEZ JORGE LUIS',mescumplimiento:'MES 1',cumplimiento:'SI'},
  {codigohogar:3830396,idhogar:4964320,periodo:'202403',idcorte:291,mobjetivo:'FERNANDEZ FERNANDEZ JORGE LUIS',mescumplimiento:'MES 2',cumplimiento:'NO'},
  {codigohogar:1749805,idhogar:2438417,periodo:'202403',idcorte:291,mobjetivo:'ALVINES YMAN SAMY VIVIANA',mescumplimiento:'MES 1',cumplimiento:'SI'},
  {codigohogar:1749805,idhogar:2438417,periodo:'202403',idcorte:291,mobjetivo:'ALVINES YMAN SAMY VIVIANA',mescumplimiento:'MES 2',cumplimiento:'SI'},
  {codigohogar:1749805,idhogar:2438417,periodo:'202403',idcorte:291,mobjetivo:'ALVINES YMAN MIRELLA CRISLI',mescumplimiento:'MES 1',cumplimiento:'SI'},
  {codigohogar:1749805,idhogar:2438417,periodo:'202403',idcorte:291,mobjetivo:'ALVINES YMAN MIRELLA CRISLI',mescumplimiento:'MES 2',cumplimiento:'NO'}
]

@Component({
  selector: 'app-listamobjetivo',
  templateUrl: './listamobjetivo.component.html',
  styleUrl: './listamobjetivo.component.scss'
})
export class ListamobjetivoComponent  implements OnInit{

  displayedColumns: string[] = ['CODIGOHOGAR','IDHOGAR', 'PERIODO', 'IDCORTE', 'MIEMBROOBJETIVO', 'CUMPLIMIENTO','CUMPLIO'];
  dataSource =new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void { 
  }

}
