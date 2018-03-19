import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerAppComponent } from './tracker-app.component';
import { NavComponent } from './components/nav/nav.component';

import { TrackerAppRoutingModule } from './tracker-app-routing.module';
import { TrackerModule } from '../tracker/tracker.module';

@NgModule({
  imports: [
    CommonModule,
    TrackerAppRoutingModule,
    TrackerModule
  ],
  declarations: [TrackerAppComponent, NavComponent]
})
export class TrackerAppModule { }
