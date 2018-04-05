import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { TrackerModule } from '../tracker/tracker.module';
import { TrackerAppRoutingModule } from './tracker-app-routing.module';

import { NavComponent } from './components/nav/nav.component';
import { TrackerAppComponent } from './tracker-app.component';

import { UserService } from '../auth/services/user.service';

import { AuthGuard } from '../auth/guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    TrackerAppRoutingModule,
    SharedModule,
    TrackerModule,
    DashboardModule
  ],
  declarations: [TrackerAppComponent, NavComponent],
  providers: [UserService, AuthGuard]
})
export class TrackerAppModule { }
