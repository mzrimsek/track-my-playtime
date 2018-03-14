import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackerAppComponent } from './tracker-app.component';
import { TrackerComponent } from '../tracker/tracker.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const OUTLET_NAME = 'trackerApp';

const trackerAppRoutes: Routes = [
  {
    path: 'app',
    component: TrackerAppComponent,
    children: [
      {
        path: 'tracker',
        component: TrackerComponent,
        outlet: OUTLET_NAME
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        outlet: OUTLET_NAME
      },
      {
        path: '',
        redirectTo: '/app/(trackerApp:tracker)',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(trackerAppRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrackerAppRoutingModule { }
