import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface Ihogares {
  memorando: string;
  expediente: string;
  codigohogar: number;
  idhogar: number;
  idcorte: number;
  periodo: string; 
  mes: string; 
  cumplio: string;
  monto: number;
  titular: string;
}

const ELEMENT_DATA: Ihogares[] = [
{memorando:'MEMORANDO N° 000381-2024-MIDIS/PNADP-UCC',expediente:'UTLA0020240000786',codigohogar:3789940,idhogar:4823081,idcorte:288,periodo:'202402',mes:'MES 2',cumplio:'SI',monto:50,titular:'LOPEZ LOPEZ ZULMA'},
{memorando:'MEMORANDO N° 000381-2024-MIDIS/PNADP-UCC',expediente:'UTLA0020240000786',codigohogar:3789940,idhogar:4823081,idcorte:291,periodo:'202403',mes:'MES 1',cumplio:'SI',monto:50,titular: 'LOPEZ LOPEZ ZULMA'},
{memorando:'MEMORANDO N° 000381-2024-MIDIS/PNADP-UCC',expediente:'UTLA0020240000786',codigohogar:3789940,idhogar:4823081,idcorte:291,periodo:'202403',mes:'MES 2',cumplio:'SI',monto:50,titular: 'LOPEZ LOPEZ ZULMA'},
{memorando:'MEMORANDO N° 000376-2024-MIDIS/PNADP-UCC',expediente:'UTICA020240000319',codigohogar:4026648,idhogar:5426664,idcorte:288,periodo:'202402',mes:'MES 1',cumplio:'SI',monto:100,titular: 'FARFAN GARCIA SINERLLY ANQUELY'},
{memorando:'MEMORANDO N° 000376-2024-MIDIS/PNADP-UCC',expediente:'UTICA020240000319',codigohogar:4026648,idhogar:5426664,idcorte:288,periodo:'202402',mes:'MES 2',cumplio:'SI',monto:100,titular: 'FARFAN GARCIA SINERLLY ANQUELY'}
];

@Component({
  selector: 'app-listahogares',
  templateUrl: './listahogares.component.html',
  styleUrl: './listahogares.component.scss'
})
export class ListahogaresComponent implements  OnInit {
 
  displayedColumns: string[] = ['MEMORANDO','EXPEDIENTE', 'CODIGOHOGAR', 'IDHOGAR', 'IDCORTE', 'PERIODO','MES','CUMPLIO','MONTO','TITULAR'];
  dataSource =new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void { 
  }

}
