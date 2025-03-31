import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrl: './spiner.component.scss'
})
export class SpinerComponent  implements OnInit{

  ngOnInit(): void {
     console.log('spiner')
  }

}
