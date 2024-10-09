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
        fechaNacimiento: new FormControl(this.date1,[Validators.required])
      }
    );
  }


  actualizarInformacion(){
    console.log(this.formularioUsuario.value);
  }
  
}
