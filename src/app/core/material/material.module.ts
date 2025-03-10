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
import {LayoutModule} from '@angular/cdk/layout';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';


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
  LayoutModule ,
  MatStepperModule,
  MatCheckboxModule,
  MatTabsModule,
  MatTableModule,
  MatSelectModule,
  MatPaginatorModule,
  MatChipsModule,
  MatDialogModule
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
