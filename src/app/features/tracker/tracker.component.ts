import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ClockService } from './services/clock.service';

import trackerSelectors, { State } from './reducers/root.reducer';

import { HistoryGrouping, TimerInfo } from './models';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerInfo$: Observable<TimerInfo>;
  currentTime$: Observable<number>;
  platformsOptions$: Observable<string[]>;

  historyGroupings$: Observable<HistoryGrouping[]>;
  historyLoading$: Observable<boolean>;
  constructor(private store: Store<State>, private clockService: ClockService) { }

  ngOnInit() {
    this.timerInfo$ = this.store.select(trackerSelectors.timerInfo);
    this.currentTime$ = this.clockService.getCurrentTime();
    this.platformsOptions$ = this.store.select(trackerSelectors.platformsOptions);

    this.historyGroupings$ = this.store.select(trackerSelectors.historyGroupingsByDate);
    this.historyLoading$ = this.store.select(trackerSelectors.historyLoading);
  }
}
