import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HogaresValidadosAptosResponse } from '@principal/model/padron/response/HogaresValidadosAptosResponse';

@Component({
  selector: 'app-hogares-actos-cierre',
  templateUrl: './hogares-actos-cierre.component.html',
  styleUrl: './hogares-actos-cierre.component.scss'
})
export class HogaresActosCierreComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['DEPARTAMENTO','PROVINCIA', 'DISTRITO', 'CENTROPOBLADO', 'CODIGOPADRON', 'PERIODO', 'IDHOGAR', 'MONTO', 'TITULAR'];
  dataSource =new MatTableDataSource<HogaresValidadosAptosResponse>();

  @Input() lsHogaresActosValidados: HogaresValidadosAptosResponse[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  

  ngOnInit(): void {
    this.listarHogaresActosValidados();
  }

  listarHogaresActosValidados(){
    console.log("************* lsHogaresActosValidados === "+this.lsHogaresActosValidados.length);
    this.dataSource =new MatTableDataSource<HogaresValidadosAptosResponse>(this.lsHogaresActosValidados);
         setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }

}
