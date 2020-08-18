import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebinarPageComponent } from './webinar-page.component';


const routes: Routes = [
  {
    path: '',
    component: WebinarPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebinarPageRoutingModule { }