import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HogaresPreValidadosAptosResponse } from '@principal/model/padron/response/HogaresPreValidadosAptosResponse';


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


 
@Component({
  selector: 'app-hogares-actos',
  templateUrl: './hogares-actos.component.html',
  styleUrl: './hogares-actos.component.scss'
})
export class HogaresActosComponent implements OnInit {

  displayedColumns: string[] = ['DEPARTAMENTO','PROVINCIA', 'DISTRITO', 'CENTROPOBLADO', 'ESQUEMA', 'CODIGOPADRON', 'PERIODO', 'IDHOGAR', 'MONTO', 'TITULAR'];
  dataSource =new MatTableDataSource<HogaresPreValidadosAptosResponse>();

  @Input() lsHogaresAptosPreCierre: HogaresPreValidadosAptosResponse[] = [];


  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  color = '#AF261A'
  ngOnInit(): void {
   this.listarHogaresAptosPreCierre();
  }

  listarHogaresAptosPreCierre(){
    console.log("*************"+this.lsHogaresAptosPreCierre);
     this.dataSource =new MatTableDataSource<HogaresPreValidadosAptosResponse>(this.lsHogaresAptosPreCierre);
     setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
