import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListaMoRevaluacionResponse } from '@principal/model/padron/response/ListaMoRevaluacionResponse';

 
@Component({
  selector: 'app-listamobjetivo',
  templateUrl: './listamobjetivo.component.html',
  styleUrl: './listamobjetivo.component.scss'
})
export class ListamobjetivoComponent  implements OnInit{

   @Input() miembrosobjetivos: ListaMoRevaluacionResponse[] = [];

  displayedColumns: string[] = ['CODIGOHOGAR','IDHOGAR', 'PERIODO', 'IDCORTE', 'MIEMBROOBJETIVO', 'MES_1','MES_2'];
  dataSource =new MatTableDataSource<ListaMoRevaluacionResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void { 
    this.listaMiembrosObjetivos();
  }

 

  listaMiembrosObjetivos(){
    console.log("-----+"+this.miembrosobjetivos.length)
    this.dataSource =new MatTableDataSource<ListaMoRevaluacionResponse>(this.miembrosobjetivos);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
