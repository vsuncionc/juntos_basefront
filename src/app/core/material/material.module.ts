import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LayoutModule} from '@angular/cdk/layout';

const materialModules = [
  MatDividerModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule,
  MatToolbarModule,
  DragDropModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  LayoutModule 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    materialModules
  ]
})
export class MaterialModule { }
