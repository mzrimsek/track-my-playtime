import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import sharedSelectors, { State as SharedState } from '../../shared/reducers/root.reducer';
import completionSelectors, { State as CompletionState } from './reducers/root.reducer';

import { HistoryGrouping } from '../../shared/models';
import { AddPlayingInfo, CompletedDisplayData, CompletionTabs, PlayingDisplayData } from './models';

import {
    getCompletedDisplayDataItems, getPlayingDisplayDataItems
} from './utils/display-data.utils';

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

  playingDisplayData$: Observable<PlayingDisplayData[]>;
  completedDisplayData$: Observable<CompletedDisplayData[]>;

  visibleTab$: Observable<CompletionTabs>;
  constructor(private sharedStore: Store<SharedState>, private completionStore: Store<CompletionState>) { }

  ngOnInit() {
    this.historyGroupings$ = this.sharedStore.select(sharedSelectors.historyGroupingsByGame);
    this.games$ = this.historyGroupings$.map(groupings => groupings.map(item => item.key));
    this.addPlayingInfo$ = this.completionStore.select(completionSelectors.addPlayingInfo);
    this.game$ = this.addPlayingInfo$.map(info => info.game ? info.game : null);

    const playingProgressItems = this.sharedStore.select(sharedSelectors.progressPlaying);
    const completedProgerssItems = this.sharedStore.select(sharedSelectors.progressCompleted);
    const markCompleteEntities = this.completionStore.select(completionSelectors.markCompleteEntities);
    this.playingDisplayData$ = getPlayingDisplayDataItems(playingProgressItems, this.historyGroupings$, markCompleteEntities);
    this.completedDisplayData$ = getCompletedDisplayDataItems(completedProgerssItems, this.historyGroupings$);

    this.visibleTab$ = this.completionStore.select(completionSelectors.visibleTab);
  }
}
