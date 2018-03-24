import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouteEntry } from '../../models';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-tracker-app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  @Input() bannerRoute: RouteEntry;
  @Input() routes: RouteEntry[] = [];
  @Input() userName: string;
  constructor(private userService: UserService) { }

  ngOnInit() { }

  logout() {
    this.userService.logout();
  }
}
