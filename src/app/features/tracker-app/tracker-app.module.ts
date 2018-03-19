import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerAppComponent } from './tracker-app.component';
import { NavComponent } from './components/nav/nav.component';

import { TrackerAppRoutingModule } from './tracker-app-routing.module';
import { TrackerModule } from '../tracker/tracker.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    TrackerAppRoutingModule,
    TrackerModule,
    DashboardModule
  ],
  declarations: [TrackerAppComponent, NavComponent]
})
export class TrackerAppModule { }
