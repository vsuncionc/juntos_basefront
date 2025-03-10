import { Component,OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeConfirmacionComponent } from '@compartido/component/mensaje-confirmacion/mensaje-confirmacion.component';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent  implements OnInit{
  datosRecibidos: any[] = [];
  title: string='';
  constructor(private fb:FormBuilder,private router: Router,private route: ActivatedRoute,private dialog: MatDialog){ 
    const navigation = this.router.getCurrentNavigation();
    this.datosRecibidos = navigation?.extras.state?.['data'] || [];
   }

  frmProceo!: FormGroup;


  
  ngOnInit(): void { 
    this.route.data.subscribe(data => {
      this.title = data['title'];
      console.log(this.title);
    });
    this.cargarFormulario();
    this.validarCarga();
  }


  cargarMiembrosHogar(){

  }

  cargarMiembrosObjetivos(){

  }

  validarCarga(){
    console.log('------ PROCESO === '+this.datosRecibidos);
    if(this.datosRecibidos.length==0){
      this.router.navigate(["principal/revaluacion/"]);
    }
  }

 
  cargarFormulario(){
    this.frmProceo = this.fb.group({
      strDescripcion : this.fb.control('')
    }); 
  }

  procesarPadron(){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent,{
       width: '500px',
       data: {mensaje: 'Esta seguro de generar Padron ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      if (result == "SI") {
        //INVOCAMOS EL SERVICIO DE PROCESAR
        console.log("------------ok");

        //REDIRIGIMOS AL COMPONENTE RESUMEN
        const codigopadron = 1;
        this.router.navigate(['principal/revaluacion/resumen/',codigopadron]);

      }
    });

     
  }

}