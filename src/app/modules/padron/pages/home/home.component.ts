import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{

formularioPadron: FormGroup = new FormGroup({});

private _formBuilder = inject(FormBuilder);

firstFormGroup = this._formBuilder.group({
  firstCtrl: ['', Validators.required],
});
secondFormGroup = this._formBuilder.group({
  secondCtrl: ['', Validators.required],
});

  ngOnInit(): void {

   
   console.log('sdfsf');
  }

}
