import { Component, OnInit } from '@angular/core';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

import { RouteEntry } from './models';

@Component({
  selector: 'app-tracker-app',
  templateUrl: './tracker-app.component.html',
  styleUrls: ['./tracker-app.component.scss']
})
export class TrackerAppComponent implements OnInit {

  private trackerRouter = ['/app', { outlets: { app: ['tracker'] } }];

  bannerRoute: RouteEntry = {
    caption: 'Track My Playtime',
    router: this.trackerRouter,
    trackingId: 'navBanner'
  };

  routes: RouteEntry[] = [
    {
      caption: 'Tracker',
      router: this.trackerRouter,
      exact: true,
      icon: faClock,
      trackingId: 'navTracker'
    },
    {
      caption: 'Dashboard',
      router: ['/app', { outlets: { app: ['dashboard'] } }],
      exact: true,
      icon: faChartBar,
      trackingId: 'navDashboard'
    }
  ];

  constructor() { }

  ngOnInit() { }
}
