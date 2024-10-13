import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  title: string='';
  formularioUsuario: FormGroup = new FormGroup({});
  date1 =  new Date();
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    
    this.route.data.subscribe(data => {
      this.title = data['title'];
      console.log(this.title);
    });

    this.formularioUsuario = new FormGroup(
      {
        nombre: new FormControl('JUAN ANGEL',[Validators.required]),
        apellidoPaterno: new FormControl('MENDOZA',[Validators.required]),
        apellidoMaterno: new FormControl('BAZAN',[Validators.required]),
        correo: new FormControl('juan@juntos.gob.pe'),
        telefono: new FormControl('943589858'),
        usuario: new FormControl('VJUAN'),
        region: new FormControl('PIURA'),
        clave: new FormControl('dfd')
      }
    );

    this.formularioUsuario.disable();
    this.formularioUsuario.get('clave')?.enable();
  }


  actualizarInformacion(){
    console.log(this.formularioUsuario.value);
  }
  
}
