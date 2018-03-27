import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { UserService } from '../auth/services/user.service';

import { User } from '../auth/models';
import { RouteEntry } from './models';

@Component({
  selector: 'app-tracker-app',
  templateUrl: './tracker-app.component.html',
  styleUrls: ['./tracker-app.component.scss']
})
export class TrackerAppComponent implements OnInit {

  private trackerRouter = ['/app', { outlets: { trackerApp: ['tracker'] } }];

  bannerRoute: RouteEntry = {
    caption: 'Track My Playtime',
    router: this.trackerRouter
  };

  routes: RouteEntry[] = [
    {
      caption: 'Tracker',
      router: this.trackerRouter,
      exact: true
    },
    {
      caption: 'Dashboard',
      router: ['/app', { outlets: { trackerApp: ['dashboard'] } }],
      exact: true
    }
  ];

  user$: Observable<User>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user$ = this.userService.getUser();
  }
}
