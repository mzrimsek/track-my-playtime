import { Component, OnInit } from '@angular/core';
import { RouteEntry } from './models';

@Component({
  selector: 'app-tracker-app',
  templateUrl: './tracker-app.component.html',
  styleUrls: ['./tracker-app.component.scss']
})
export class TrackerAppComponent implements OnInit {

  routes: RouteEntry[] = [
    {
      caption: 'Tracker',
      router: ['/app', { outlets: { trackerApp: ['tracker'] } }],
      exact: true
    },
    {
      caption: 'Dashboard',
      router: ['/app', { outlets: { trackerApp: ['dashboard'] } }],
      exact: true
    }
  ];

  constructor() { }

  ngOnInit() { }
}
