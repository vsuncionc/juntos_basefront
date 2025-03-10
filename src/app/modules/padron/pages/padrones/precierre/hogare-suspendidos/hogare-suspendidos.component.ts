import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ITfListaHogares {
  codigo: number,
  departamento: String,
  provincia: String,
  distrito: String,
  centroPoblado: String,
  tipoPadron: String,
  codigoPadron: String,
  periodo: String,
  idhogar: String,
  monto: String,
  titular: String
}

const ELEMENT_DATA: ITfListaHogares[] = [
  {codigo:3,departamento:"CAJAMARCA",provincia:"CAJAMARCA",distrito: "CAJAMARCA",centroPoblado:"CELENDIN",tipoPadron:"REVISION POSTERIOR",codigoPadron:"457",periodo:"202402",idhogar:"5426664",monto:"100",titular:"LOPEZ LOPEZ ZULMA"}
];

@Component({
  selector: 'app-hogare-suspendidos',
  templateUrl: './hogare-suspendidos.component.html',
  styleUrl: './hogare-suspendidos.component.scss'
})
export class HogareSuspendidosComponent implements OnInit {
   
    displayedColumns: string[] = ['DEPARTAMENTO','PROVINCIA', 'DISTRITO', 'CENTROPOBLADO', 'TIPOPADRON', 'CODIGOPADRON', 'PERIODO', 'IDHOGAR', 'MONTO', 'TITULAR'];
    dataSource =new MatTableDataSource<any>(ELEMENT_DATA);


   @ViewChild(MatPaginator) paginator!: MatPaginator;
   ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
   }

   ngOnInit(): void { 
  }
}
