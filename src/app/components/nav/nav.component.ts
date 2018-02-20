import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  @Input() routes: RouteEntry[] = [];
  constructor() { }

  ngOnInit() { }
}

export interface RouteEntry {
  caption: string;
  router: string[];
  exact: boolean;
}
