import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent implements OnInit {
  
  constructor(private fb:FormBuilder,private route: ActivatedRoute){  }
  codigoPadron:number=0;
  formResumen!: FormGroup;
  title: string='';

  ngOnInit(): void {
    this.codigoPadron = Number(this.route.snapshot.paramMap.get('codigopadron'));   
   console.log('codigopadron ='+this.codigoPadron);  
   this.cargarFormulario();
   this.route.data.subscribe(data => {
    this.title = data['title'];
    console.log(this.title);
  });

  }


  cargarFormulario(){
    this.formResumen = this.fb.group({
      codigoPadron : this.fb.control('581'),
      fechaGeneracion : this.fb.control('10/12/2024'),
      cantidadHogares : this.fb.control('5'),
      montoTotal : this.fb.control('350'),
    });
  }

}
