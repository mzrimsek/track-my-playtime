import { Component, OnInit } from '@angular/core';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
    faBars, faChartBar, faClipboardList, faList, faSignOutAlt, faTimes
} from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../features/auth/services/user.service';

import { UserInfo } from '../../features/profile/models';
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
  profileRoute: RouteEntry = {
    caption: '',
    router: ['app/profile'],
    trackingCategory: 'navProfile'
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
    },
    {
      caption: 'Completion',
      router: ['app/completion'],
      exact: true,
      icon: faClipboardList,
      trackingCategory: 'navCompletion'
    }
  ];
  hideNavContents = true;
  userInfo: UserInfo;
  icons = {
    logout: faSignOutAlt,
    menu: faBars,
    close: faTimes
  };
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(userInfo => this.userInfo = userInfo);
  }

  logout() {
    this.userService.logout();
  }

  toggleNav() {
    this.hideNavContents = !this.hideNavContents;
  }
}
