import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 
  @ViewChild(MatSidenav)
  sidenav !: MatSidenav;
  display = false;
  constructor( private observer: BreakpointObserver, private cd: ChangeDetectorRef ) {

  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((resp: any) => {
      console.log(resp);
      if(resp.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.display =false;
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.display =true;
      }
   })
   this.cd.detectChanges();
  }

}
