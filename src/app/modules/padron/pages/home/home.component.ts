import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{
title: string='';
constructor(private fb:FormBuilder,private route: ActivatedRoute) {
 }
 
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.title = data['title'];
      console.log(this.title);
    });
  }


}
