import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
 

export interface InfRevaluacionesPadron {
  tipoEsquema: String;
  expediente: String;
  documento: String;
  fecha: String;
  proceso: String;
  cantHogares: number;
} 

const ELEMENT_DATA: InfRevaluacionesPadron[] = [
  {tipoEsquema:'TPI',expediente:'UTLA0020240000786',documento:'MEMORANDO N° 000381-2024-MIDIS/PNADP-UCC',fecha:'20/09/2024',proceso:'usuaria López López Zulma con DNI Nº 46914520',cantHogares:1},
  {tipoEsquema:'BASE',expediente:'UTICA020240000319',documento:'MEMORANDO N° 000376-2024-MIDIS/PNADP-UCC',fecha:'13/09/2024',proceso:'Anquely Farfan Garcia DNI N° 46405145',cantHogares:1}
];
@Component({
  selector: 'app-formrevalupadron',
  templateUrl: './formrevalupadron.component.html',
  styleUrl: './formrevalupadron.component.scss'
})
export class FormrevalupadronComponent implements OnInit{
frmRevaluacionpadron!: FormGroup;
displayedColumns: string[] = ['TIPO','EXPEDIENTE', 'DOCUMENTO', 'FECHA', 'PROCESO', 'HOGARES',  'DETALLE'];
dataSource =new MatTableDataSource<any>(ELEMENT_DATA);

@ViewChild(MatPaginator) paginator!: MatPaginator;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

constructor(private fb:FormBuilder){
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
  
 }

}
