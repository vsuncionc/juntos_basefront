import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 
  @ViewChild(MatSidenav)
  sidenav !: MatSidenav;
  display = false;

  formularioDashboard: FormGroup = new FormGroup({});
  

  constructor( private observer: BreakpointObserver, private cd: ChangeDetectorRef ,
    private router: Router) {

  }
  ngOnInit(): void {
    this.formularioDashboard = new FormGroup(
      {
        ocultarMenu: new FormControl(true)
      }
    )
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((resp: any) => {
      //console.log(resp);
      if(resp.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.display =false;
        this.formularioDashboard.get('ocultarMenu')?.setValue(false);
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.display =true;
        this.formularioDashboard.get('ocultarMenu')?.setValue(true);
      }
   })
   this.cd.detectChanges();
  }


  cargarInformacion(){
    this.router.navigate(["/principal/usuario"]);
  }

  mostrarMenu(){
    if(this.formularioDashboard.get('ocultarMenu')?.value == true){
      this.sidenav.open();
    }else{
      this.sidenav.close();
    }
    
  }
  

}
