import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import sharedSelectors, { State as SharedState } from 'shared/reducers/root.reducer';

import { HistoryGrouping } from 'shared/models';
import { AddPlayingInfo, CompletedDisplayData, PlayingDisplayData, TabType } from './models';

import { filterPlatforms, filterStartTimes } from 'shared/utils/history-filter.utils';
import {
    getCompletedDisplayDataItems, getPlayingDisplayDataItems
} from './utils/display-data.utils';

import completionSelectors, { State as CompletionState } from './reducers/root.reducer';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.scss']
})
export class CompletionComponent implements OnInit {

  historyGroupings$: Observable<HistoryGrouping[]>;
  games$: Observable<string[]>;
  addPlayingInfo$: Observable<AddPlayingInfo>;
  game$: Observable<string | null>;
  potentialPlatforms$: Observable<string[]>;
  potentialDates$: Observable<number[]>;

  playingDisplayData$: Observable<PlayingDisplayData[]>;
  completedDisplayData$: Observable<CompletedDisplayData[]>;

  visibleTab$: Observable<TabType>;
  constructor(private sharedStore: Store<SharedState>, private completionStore: Store<CompletionState>) { }

  ngOnInit() {
    this.historyGroupings$ = this.sharedStore.select(sharedSelectors.historyGroupingsByGame);
    this.games$ = this.historyGroupings$.pipe(map(groupings => groupings.map(item => item.key)));
    this.addPlayingInfo$ = this.completionStore.select(completionSelectors.addPlayingInfo);
    this.game$ = this.addPlayingInfo$.pipe(map(info => info.game ? info.game : null));
    this.potentialPlatforms$ = combineLatest(this.historyGroupings$, this.addPlayingInfo$, (groupings, info) => {
      return filterPlatforms(groupings, info.game);
    });
    this.potentialDates$ = combineLatest(this.historyGroupings$, this.addPlayingInfo$, (groupings, info) => {
      return filterStartTimes(groupings, info.game, info.platform);
    });

    const playingProgressItems = this.sharedStore.select(sharedSelectors.progressPlaying);
    const completedProgerssItems = this.sharedStore.select(sharedSelectors.progressCompleted);
    const markCompleteEntities = this.completionStore.select(completionSelectors.markCompleteEntities);
    this.playingDisplayData$ = getPlayingDisplayDataItems(playingProgressItems, this.historyGroupings$, markCompleteEntities);
    this.completedDisplayData$ = getCompletedDisplayDataItems(completedProgerssItems, this.historyGroupings$);

    this.visibleTab$ = this.completionStore.select(completionSelectors.visibleTab);
  }
}
