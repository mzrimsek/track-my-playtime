import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import sharedSelectors, { State as SharedState } from 'shared/reducers/root.reducer';

import { ElapsedTimeService } from 'shared/services/elapsed-time.service';

import { HistoryGrouping, NgSelectValue, TimerInfo } from 'shared/models';

import { hasMoreToDisplay, takeFrom } from './utils/display.utils';

import trackerSelectors, { State as TrackerState } from './reducers/root.reducer';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerInfo$: Observable<TimerInfo>;
  platformsOptions$: Observable<string[]>;
  game$: Observable<string | NgSelectValue | null>;
  elapsedTime$: Observable<string>;

  historyGroupings$: Observable<HistoryGrouping[]>;
  showLoadMoreButton$: Observable<boolean>;

  trackedGames$: Observable<string[]>;
  constructor(private trackerStore: Store<TrackerState>,
    private sharedStore: Store<SharedState>,
    private elapsedTimeService: ElapsedTimeService) { }

  ngOnInit() {
    this.timerInfo$ = this.sharedStore.select(sharedSelectors.timerInfo);
    this.game$ = this.timerInfo$.pipe(map(info => info.game ? info.game : null));
    this.elapsedTime$ = this.elapsedTimeService.getElapsedTime('00:00:00');

    const historyGroupings = this.sharedStore.select(sharedSelectors.historyGroupingsByDate);
    const entriesToShow = this.trackerStore.select(trackerSelectors.entriesToShow);
    const filteredGroupings = takeFrom(historyGroupings, entriesToShow);

    this.historyGroupings$ = filteredGroupings;
    this.showLoadMoreButton$ = hasMoreToDisplay(historyGroupings, filteredGroupings);

    this.trackedGames$ = this.sharedStore.select(sharedSelectors.historyTrackedGames);
    this.platformsOptions$ = this.sharedStore.select(sharedSelectors.platformsOptions);
  }
}
