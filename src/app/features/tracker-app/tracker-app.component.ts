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

  bannerRoute: RouteEntry = {
    caption: 'Track My Playtime',
    router: this.getNavRouter('tracker'),
    trackingCategory: 'navBanner'
  };

  routes: RouteEntry[] = [
    {
      caption: 'Tracker',
      router: this.getNavRouter('tracker'),
      exact: true,
      icon: faClock,
      trackingCategory: 'navTracker'
    },
    {
      caption: 'Dashboard',
      router: this.getNavRouter('dashboard'),
      exact: true,
      icon: faChartBar,
      trackingCategory: 'navDashboard'
    }
  ];

  constructor() { }

  ngOnInit() { }

  private getNavRouter(route: string) {
    const parentRoute = '/app';
    return [parentRoute, { outlets: { app: [route] } }];
  }
}
