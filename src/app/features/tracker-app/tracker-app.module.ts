import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerAppComponent } from './tracker-app.component';
import { NavComponent } from './components/nav/nav.component';

import { TrackerAppRoutingModule } from './tracker-app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TrackerModule } from '../tracker/tracker.module';
import { DashboardModule } from '../dashboard/dashboard.module';

import { UserService } from '../auth/services/user.service';

import { AuthGuard } from '../auth/guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    TrackerAppRoutingModule,
    SharedModule,
    TrackerModule,
    DashboardModule
  ],
  declarations: [TrackerAppComponent, NavComponent],
  providers: [UserService, AuthGuard]
})
export class TrackerAppModule { }
