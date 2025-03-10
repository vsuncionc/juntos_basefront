import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  {codigo:3,departamento:"CAJAMARCA",provincia:"CAJAMARCA",distrito: "CAJAMARCA",centroPoblado:"CELENDIN",tipoPadron:"REVISION POSTERIOR",codigoPadron:"457",periodo:"202402",idhogar:"5426664",monto:"100",titular:"LOPEZ LOPEZ ZULMA"},
  {codigo:4,departamento:"TUMBES",provincia:"TUMBES",distrito: "ZARUMILLA",centroPoblado:"LA PALMA",tipoPadron:"REVISION POSTERIOR",codigoPadron:"450",periodo:"202401",idhogar:"8785454",monto:"200",titular:"MARIA RASTA RAMIREZ"}
];

let lista: number[] = [];
@Component({
  selector: 'app-padron-home',
  templateUrl: './padron-home.component.html',
  styleUrl: './padron-home.component.scss'
})
export class PadronHomeComponent implements OnInit{
constructor(private fb:FormBuilder,private route:Router,private router: ActivatedRoute){}
formProcesarPadron!: FormGroup;
selection = new SelectionModel<ITfListaHogares>(true, []);
displayedColumns: string[] = ['OP','DEPARTAMENTO','PROVINCIA', 'DISTRITO', 'CENTROPOBLADO', 'TIPOPADRON', 'PADRON', 'PERIODO', 'IDHOGAR', 'MONTO', 'TITULAR'];
dataSource =new MatTableDataSource<any>(ELEMENT_DATA);
title: string='';

 @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.title = data['title'];
      console.log(this.title);
    });
     this.cargarFormulario();
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
      console.log(s.codigo)
      //lista.push(s.codigo)
    );

    return lista;
  }

  cargarFormulario(){
   this.formProcesarPadron = this.fb.group({
    strCbtipoPadron  : this.fb.control(''),
    strPeriodoInicio : this.fb.control(''),
    strPeriodoFin    : this.fb.control(''),
    strFechaPadron   : this.fb.control(''),
    strDescripcion   :this.fb.control('')
   });
  }


  procesarHogares(){
    this.logSelection();
    this.route.navigate(['principal/revaluacion/precierre']);

  }

}
