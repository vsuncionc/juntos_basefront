import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InformacionComponent } from '../detalle/informacion/informacion.component';
import { SelectionModel } from '@angular/cdk/collections';


export interface PeriodicElement {
  idrevaluacion: number;
  tipoesquema: string;
  expediente: string;
  documento: string;
  fecha: string;
  proceso: string;
  cantidadhogares: number; 
  detalle: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { idrevaluacion:100, tipoesquema: 'TAS', expediente: 'UTLI0020240000496', documento: 'MEMORANDO N° 000371-2024-MIDIS/PNADP-UCC', fecha: '2/09/2024',  proceso: 'posterior de VCC III 2024 hogares con MO del Grupo 1', cantidadhogares: 1 ,detalle:''},
  { idrevaluacion:101, tipoesquema: 'TPI', expediente: 'UTLA0020240000786', documento: 'MEMORANDO N° 000381-2024-MIDIS/PNADP-UCC', fecha: '20/09/2024',  proceso: 'usuaria López López Zulma con DNI Nº 46914520', cantidadhogares: 1 ,detalle:''},
  { idrevaluacion:105, tipoesquema: 'BASE', expediente: 'UTICA020240000319', documento: 'MEMORANDO N° 000376-2024-MIDIS/PNADP-UCC', fecha: '13/09/2024',  proceso: 'Anquely Farfan Garcia DNI N° 46405145', cantidadhogares: 1 ,detalle:''},
  { idrevaluacion:106, tipoesquema: 'TAS', expediente: 'UTLI0020240000496', documento: 'MEMORANDO N° 000371-2024-MIDIS/PNADP-UCC', fecha: '2/09/2024',  proceso: 'posterior de VCC III 2024 hogares con MO del Grupo 1', cantidadhogares: 1 ,detalle:''},
  { idrevaluacion:107, tipoesquema: 'TPI', expediente: 'UTLA0020240000786', documento: 'MEMORANDO N° 000381-2024-MIDIS/PNADP-UCC', fecha: '20/09/2024',  proceso: 'usuaria López López Zulma con DNI Nº 46914520', cantidadhogares: 1 ,detalle:''},
  { idrevaluacion:108, tipoesquema: 'BASE', expediente: 'UTICA020240000319', documento: 'MEMORANDO N° 000376-2024-MIDIS/PNADP-UCC', fecha: '13/09/2024',  proceso: 'Anquely Farfan Garcia DNI N° 46405145', cantidadhogares: 1 ,detalle:''}
  
];

let lista: number[] = [];
@Component({
  selector: 'app-formrevaluacion',
  templateUrl: './formrevaluacion.component.html',
  styleUrl: './formrevaluacion.component.scss'
})
export class FormrevaluacionComponent implements OnInit {

frmRevaluacion!: FormGroup;
title: string='';
selection = new SelectionModel<PeriodicElement>(true, []);


displayedColumns: string[] = ['OP','IDREVAL', 'TIPO', 'EXPEDIENTE', 'DOCUMENTO', 'FECHA', 'PROCESO', 'HOGARES', 'DETALLE'];
dataSource =new MatTableDataSource<any>(ELEMENT_DATA);

@ViewChild(MatPaginator) paginator!: MatPaginator;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

constructor(private fb:FormBuilder,private route: ActivatedRoute,private router: Router,
  private matDialog: MatDialog) {
  
 }
 
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.title = data['title'];
      console.log(this.title);
      this.cargarFormulario();
    });
    
  }

 

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  logSelection() {
   // this.selection.selected.forEach(s => console.log(s.idrevaluacion)  );
    this.selection.selected.forEach(s => 
      //console.log(s.idrevaluacion)  
      lista.push(s.idrevaluacion)
    );

    return lista;
  }

  cargarFormulario(){
    this.frmRevaluacion = this.fb.group({
      cbOpcionesBusqueda : [''],
      StrCriterio : [''],
      cbTipoEsquema : ['']
    });
    
  }
 
  procesarRevaluaciones(){
   // console.log(this.frmRevaluacion.value);
  lista =this.logSelection();
  console.log("--logSelection--"+lista.length);
  if(lista.length>0){
    this.router.navigate(
      ["principal/revaluacion/procesar"],
       {
        state: { data: lista},
       }
    );
    lista=[];
  }else{
    alert("--SELECCIONE REVALUACIONES--");
  }


    //console.log(lista);
    
  }


  verDetalle(pidrevaluacion:number,ptipo:String,pexpediente:String,pdocumento:String,proceso:String): void{
    console.log('------');
    const dialogRef = this.matDialog.open(InformacionComponent,{
      width: '80vw', // Ancho del diálogo
      height: '85vh', // Altura del diálogo
      maxWidth: '90vw', // Máximo ancho (opcional)
      maxHeight: '90vh', // Máxima altura (opcional)
      data: { tipo: ptipo, expediente: pexpediente,documento:pdocumento,proceso:proceso,idrevaluacion: pidrevaluacion} 
    });

 

  }


}
