import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ClockService } from './services/clock.service';

import sharedSelectors, { State as SharedState } from '../../shared/reducers/root.reducer';
import trackerSelectors, { State as TrackerState } from './reducers/root.reducer';

import { HistoryGrouping } from '../../shared/models';
import { TimerInfo } from './models';

import { hasMoreToDisplay, takeFrom } from './utils/display.utils';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerInfo$: Observable<TimerInfo>;
  currentTime$: Observable<number>;
  platformsOptions$: Observable<string[]>;
  game$: Observable<string | null>;

  historyGroupings$: Observable<HistoryGrouping[]>;
  historyLoading$: Observable<boolean>;
  showLoadMoreButton$: Observable<boolean>;

  trackedGames$: Observable<string[]>;
  constructor(private trackerStore: Store<TrackerState>, private sharedStore: Store<SharedState>, private clockService: ClockService) { }

  ngOnInit() {
    this.timerInfo$ = this.trackerStore.select(trackerSelectors.timerInfo);
    this.currentTime$ = this.clockService.getCurrentTime();
    this.platformsOptions$ = this.trackerStore.select(trackerSelectors.platformsOptions);
    this.game$ = this.timerInfo$.map(info => info.game ? info.game : null);

    const historyGroupings = this.sharedStore.select(sharedSelectors.historyGroupingsByDate);
    const entriesToShow = this.trackerStore.select(trackerSelectors.entriesToShow);
    const filteredGroupings = takeFrom(historyGroupings, entriesToShow);

    this.historyGroupings$ = filteredGroupings;
    this.historyLoading$ = this.sharedStore.select(sharedSelectors.historyLoading);
    this.showLoadMoreButton$ = hasMoreToDisplay(historyGroupings, filteredGroupings);

    this.trackedGames$ = this.sharedStore.select(sharedSelectors.historyTrackedGames);
  }
}
