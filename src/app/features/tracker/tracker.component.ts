import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClockService } from './services/clock.service';
import { TimerInfo, HistoryListItem, RouteEntry } from './models';
import trackerComponentSelectors, { State } from './reducers';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  routes: RouteEntry[] = [
    {
      caption: 'Tracker',
      router: ['tracker'],
      exact: true
    }
  ];

  timerInfo$: Observable<TimerInfo>;
  currentTime$: Observable<Date>;
  historyItems$: Observable<HistoryListItem[]>;
  platformsOptions$: Observable<string[]>;
  constructor(private store: Store<State>, private clockService: ClockService) { }

  ngOnInit() {
    this.timerInfo$ = this.store.select(trackerComponentSelectors.timerInfo);
    this.currentTime$ = this.clockService.getClock();
    this.historyItems$ = this.store.select(trackerComponentSelectors.historyItems);
    this.platformsOptions$ = this.store.select(trackerComponentSelectors.platformsOptions);
  }
}
