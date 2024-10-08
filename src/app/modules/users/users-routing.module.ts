import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './pages/info/info.component';

const routes: Routes = [
  {path:'',component:InfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
