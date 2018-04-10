import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ClockService } from './services/clock.service';

import trackerComponentSelectors, { State } from './reducers/root.reducer';

import { HistoryGroupingListItem, TimerInfo } from './models';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerInfo$: Observable<TimerInfo>;
  currentTime$: Observable<number>;
  platformsOptions$: Observable<string[]>;

  historyGroupingListItems$: Observable<HistoryGroupingListItem[]>;
  historyLoading$: Observable<boolean>;
  constructor(private store: Store<State>, private clockService: ClockService) { }

  ngOnInit() {
    this.timerInfo$ = this.store.select(trackerComponentSelectors.timerInfo);
    this.currentTime$ = this.clockService.getCurrentTime();
    this.platformsOptions$ = this.store.select(trackerComponentSelectors.platformsOptions);

    this.historyGroupingListItems$ = this.store.select(trackerComponentSelectors.historyGroupingListItemsByDate);
    this.historyLoading$ = this.store.select(trackerComponentSelectors.historyLoading);
  }
}
