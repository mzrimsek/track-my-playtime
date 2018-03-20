import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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
  constructor() { }

  ngOnInit() { }
}
