import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListaRevaluacionesService } from '@modulos/padron/service/lista-revaluaciones.service';
import { PadronBuscarRequest } from '@principal/model/padron/request/PadronBuscarRequest';
import { RevaluacionPadronResponse } from '@principal/model/padron/response/RevaluacionPadronResponse';
import { InformacionComponent } from '../detalle/informacion/informacion.component';
 
@Component({
  selector: 'app-formrevalupadron',
  templateUrl: './formrevalupadron.component.html',
  styleUrl: './formrevalupadron.component.scss'
})
export class FormrevalupadronComponent implements OnInit{
frmRevaluacionpadron!: FormGroup;
displayedColumns: string[] = ['TIPO','EXPEDIENTE', 'DOCUMENTO', 'FECHA', 'PADRON', 'HOGARES',  'DETALLE'];
dataSource =new MatTableDataSource<RevaluacionPadronResponse>();

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

constructor(
  private fb:FormBuilder,
  private revaluacionService:ListaRevaluacionesService,
    private matDialog: MatDialog
){
  this.cargarFormulario();
} 

  ngOnInit(): void {
    
  }

  
 cargarFormulario(){
  this.frmRevaluacionpadron = this.fb.group({
    nCodigoPadron : [''] 
  });
 }

 buscarRevaluacionPadron(){
   console.log('CODIGO PADRON ='+this.frmRevaluacionpadron.get('nCodigoPadron')?.value);
   const request = { codigoPadron:this.frmRevaluacionpadron.get('nCodigoPadron')?.value} as PadronBuscarRequest
   this.revaluacionService.ListarRevaluacionesPorPadron<RevaluacionPadronResponse>(request).
   subscribe({
    next: (data) => {
      if (data.status === '1') {
        console.log('data:', data.data);
        this.dataSource = new MatTableDataSource<RevaluacionPadronResponse>(data.data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
       } else {
        console.log('error al consultar');
      }
    } ,
    error: (error) => {
      console.error('Error en la petición:', error);
    },
   });
 }


 verDetalle(pidrevaluacion:number,ptipo:String,pexpediente:String,pdocumento:String,proceso:String): void{
    const dialogRef = this.matDialog.open(InformacionComponent,{
      width: '80vw', // Ancho del diálogo
      height: '85vh', // Altura del diálogo
      maxWidth: '90vw', // Máximo ancho (opcional)
      maxHeight: '90vh', // Máxima altura (opcional)
      data: { tipo: ptipo, expediente: pexpediente,documento:pdocumento,proceso:proceso,idrevaluacion: pidrevaluacion} 
    });
  }


}
