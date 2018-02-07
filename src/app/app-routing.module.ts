import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackerComponent } from './features/tracker/tracker.component';

const routes: Routes = [
  {
    path: 'tracker',
    component: TrackerComponent
  },
  {
    path: '**',
    redirectTo: 'tracker'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
