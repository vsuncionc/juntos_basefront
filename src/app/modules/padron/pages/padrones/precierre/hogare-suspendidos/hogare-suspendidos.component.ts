import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HogaresPreValidadoSuspendidosResponse } from '@principal/model/padron/response/HogaresPreValidadoSuspendidosResponse';
 
@Component({
  selector: 'app-hogare-suspendidos',
  templateUrl: './hogare-suspendidos.component.html',
  styleUrl: './hogare-suspendidos.component.scss'
})
export class HogareSuspendidosComponent implements OnInit {

  @Input() lsHogaresSuspendidosPreCierre: HogaresPreValidadoSuspendidosResponse[] = [];

  
   // displayedColumns: string[] = ['DEPARTAMENTO','PROVINCIA', 'DISTRITO', 'CENTROPOBLADO', 'TIPOPADRON', 'CODIGOPADRON', 'PERIODO', 'IDHOGAR', 'MONTO', 'TITULAR'];
   displayedColumns: string[] = ['DEPARTAMENTO', 'ESQUEMA', 'CODIGOPADRON', 'PERIODO', 'IDHOGAR', 'MONTO', 'TITULAR','OBSERVACION'];
    dataSource =new MatTableDataSource<HogaresPreValidadoSuspendidosResponse>();


   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
   }

   ngOnInit(): void { 
    this.listarHogarSuspendidosPreCierre();
  }

  listarHogarSuspendidosPreCierre(){
    console.log("lsHogaresSuspendidosPreCierre",this.lsHogaresSuspendidosPreCierre.length);
    console.log("*************"+this.lsHogaresSuspendidosPreCierre);
    this.dataSource =new MatTableDataSource<HogaresPreValidadoSuspendidosResponse>(this.lsHogaresSuspendidosPreCierre);
    setTimeout(() => {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   });
  }
}
