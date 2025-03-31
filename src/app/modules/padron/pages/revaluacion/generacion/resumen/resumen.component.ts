import { PadronService } from './../../../../service/padron.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PadronBuscarRequest } from '@principal/model/padron/request/PadronBuscarRequest';
import { ResumenGeneracionPadronResponse } from '@principal/model/padron/response/ResumenGeneracionPadronResponse';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent implements OnInit {
  
  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private padronservice :PadronService){  }

  codigoPadron:number=0;
  formResumen!: FormGroup;
  title: string='';
  infoResumen :ResumenGeneracionPadronResponse[]=[];
  cargando:boolean=true;

  ngOnInit(): void {
    this.codigoPadron = Number(this.route.snapshot.paramMap.get('codigopadron'));   
   console.log('codigopadron ='+this.codigoPadron);  
   this.cargarFormulario();
   this.route.data.subscribe(data => {
    this.title = data['title'];
    console.log(this.title);
  });
    this.mostraInformacionCabecera();
  }


  cargarFormulario(){
    this.formResumen = this.fb.group({
      codigoPadron : this.fb.control(''),
      fechaGeneracion : this.fb.control(''),
      cantidadHogares : this.fb.control(''),
      montoTotal : this.fb.control(''),
    });
  }


  mostraInformacionCabecera() {
    const request = {
      codigoPadron: this.codigoPadron
    } as PadronBuscarRequest;
  
    this.padronservice.resumenPadronGenerado<ResumenGeneracionPadronResponse>(request)
      .subscribe({
        next: (data) => {
          if (data.status === '1') {
            this.cargando = true;
            this.infoResumen = data.data;
            this.formResumen.get('codigoPadron')?.setValue(this.codigoPadron);
            this.formResumen.get('fechaGeneracion')?.setValue(this.infoResumen[0].fechaPadron);
            this.formResumen.get('cantidadHogares')?.setValue(this.infoResumen[0].cantidadHogares);
            this.formResumen.get('montoTotal')?.setValue(this.infoResumen[0].montoTotal);
            this.cargando = false;
            console.log('Fecha del padrón:', this.infoResumen[0].fechaPadron);
          }
        },
        error: (err) => {
          console.error('Error al obtener la información del padrón:', err);
          this.cargando = false; // Detener el indicador de carga en caso de error
        }
      });
  }


descargarReporte(){
  this.padronservice.descargaReportePadronGenerado(this.codigoPadron).
  subscribe((data)=>{
    saveAs(data,`ReportePadron_${this.codigoPadron}.xlsx`);
  });
}



}
