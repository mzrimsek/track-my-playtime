import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackerComponent } from './tracker.component';

const routes: Routes = [
  {
    path: '',
    component: TrackerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerRoutingModule { }
