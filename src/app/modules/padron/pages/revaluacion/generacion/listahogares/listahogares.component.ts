import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListaHogarSeleccionadosRevaResponse } from '@principal/model/padron/response/ListaHogarSeleccionadosRevaResponse';

@Component({
  selector: 'app-listahogares',
  templateUrl: './listahogares.component.html',
  styleUrl: './listahogares.component.scss'
})
export class ListahogaresComponent implements  OnInit {
   
  @Input() hogares: ListaHogarSeleccionadosRevaResponse[] = [];
  //listaHogares:ListaHogarSeleccionadosRevaResponse[]=[]; 
  displayedColumns: string[] = ['ESQUEMA', 'EXPEDIENTE', 'CODIGOHOGAR', 'IDHOGAR', 'IDCORTE', 'PERIODO','MES','CUMPLIO','MONTO','TITULAR'];
  dataSource =new MatTableDataSource<ListaHogarSeleccionadosRevaResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    
  ngOnInit(): void { 
     this.listarHogares();
  }

  listarHogares(){
    this.dataSource =new MatTableDataSource<ListaHogarSeleccionadosRevaResponse>(this.hogares);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
