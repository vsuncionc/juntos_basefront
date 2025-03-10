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
  {codigo:1,departamento:"CAJAMARCA",provincia:"CAJAMARCA",distrito: "CAJAMARCA",centroPoblado:"CELENDIN",tipoPadron:"REVISION POSTERIOR",codigoPadron:"457",periodo:"202402",idhogar:"4823081",monto:"50",titular:"LOPEZ LOPEZ ZULMA"},
  {codigo:2,departamento:"CAJAMARCA",provincia:"CAJAMARCA",distrito: "CAJAMARCA",centroPoblado:"CELENDIN",tipoPadron:"REVISION POSTERIOR",codigoPadron:"457",periodo:"202403",idhogar:"4823081",monto:"100",titular:"LOPEZ LOPEZ ZULMA"},
  {codigo:4,departamento:"TUMBES",provincia:"TUMBES",distrito: "ZARUMILLA",centroPoblado:"LA PALMA",tipoPadron:"REVISION POSTERIOR",codigoPadron:"450",periodo:"202401",idhogar:"8785454",monto:"200",titular:"MARIA RASTA RAMIREZ"}
];
@Component({
  selector: 'app-hogares-actos',
  templateUrl: './hogares-actos.component.html',
  styleUrl: './hogares-actos.component.scss'
})
export class HogaresActosComponent implements OnInit {

  displayedColumns: string[] = ['DEPARTAMENTO','PROVINCIA', 'DISTRITO', 'CENTROPOBLADO', 'TIPOPADRON', 'CODIGOPADRON', 'PERIODO', 'IDHOGAR', 'MONTO', 'TITULAR'];
  dataSource =new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  color = '#AF261A'
  ngOnInit(): void {
    
  }

}
