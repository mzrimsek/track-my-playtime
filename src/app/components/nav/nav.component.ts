import { Component, OnInit } from '@angular/core';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
    faBars, faChartBar, faList, faSignOutAlt, faTimes
} from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../features/auth/services/user.service';

import { User } from '../../features/auth/models';
import { RouteEntry } from '../../models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  bannerRoute: RouteEntry = {
    caption: 'Track My Playtime',
    router: ['app'],
    trackingCategory: 'navBanner'
  };
  routes: RouteEntry[] = [
    {
      caption: 'Tracker',
      router: ['app/tracker'],
      exact: true,
      icon: faClock,
      trackingCategory: 'navTracker'
    },
    {
      caption: 'Dashboard',
      router: ['app/dashboard'],
      exact: true,
      icon: faChartBar,
      trackingCategory: 'navDashboard'
    },
    {
      caption: 'Library',
      router: ['app/library'],
      exact: true,
      icon: faList,
      trackingCategory: 'navLibrary'
    }
  ];
  hideNavContents = true;
  user: User;
  icons = {
    logout: faSignOutAlt,
    menu: faBars,
    close: faTimes
  };
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.logout();
  }

  toggleNav() {
    this.hideNavContents = !this.hideNavContents;
  }
}
