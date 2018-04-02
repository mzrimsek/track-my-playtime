import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackerComponent } from '../tracker/tracker.component';
import { TrackerAppComponent } from './tracker-app.component';

import { AuthGuard } from '../auth/guards/auth.guard';

// import { DashboardComponent } from '../dashboard/dashboard.component';
const OUTLET_NAME = 'trackerApp';

const trackerAppRoutes: Routes = [
  {
    path: 'app',
    component: TrackerAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tracker',
        component: TrackerComponent,
        outlet: OUTLET_NAME
      },
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      //   outlet: OUTLET_NAME
      // },
      {
        path: '**',
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
