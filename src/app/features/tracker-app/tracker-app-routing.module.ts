import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackerComponent } from '../tracker/tracker.component';
import { TrackerAppComponent } from './tracker-app.component';

import { AuthGuard } from '../auth/guards/auth.guard';

const OUTLET_NAME = 'app';

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
      {
        path: '**',
        redirectTo: `/app/(${OUTLET_NAME}:tracker)`,
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
