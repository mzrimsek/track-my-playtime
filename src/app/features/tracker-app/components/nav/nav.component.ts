import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../auth/services/user.service';

import { User } from '../../../auth/models';
import { RouteEntry } from '../../models';

@Component({
  selector: 'app-tracker-app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  @Input() bannerRoute: RouteEntry;
  @Input() routes: RouteEntry[] = [];
  user: User;
  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }

  ngOnInit() { }

  logout() {
    this.userService.logout();
  }
}
