import { Component, OnInit } from '@angular/core';

import { faClock } from '@fortawesome/free-regular-svg-icons';

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
    trackingCategory: 'navBanner'
  };

  routes: RouteEntry[] = [
    {
      caption: 'Tracker',
      router: this.trackerRouter,
      exact: true,
      icon: faClock,
      trackingCategory: 'navTracker'
    }
  ];

  constructor() { }

  ngOnInit() { }
}
