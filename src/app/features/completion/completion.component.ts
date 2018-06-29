import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import sharedSelectors, { State as SharedState } from '../../shared/reducers/root.reducer';
import completionSelectors, { State as CompletionState } from './reducers/root.reducer';

import { Dictionary, HistoryGrouping, ProgressItem } from '../../shared/models';
import { AddPlayingInfo, MarkCompleteItem } from './models';

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

  playing$: Observable<ProgressItem[]>;
  completed$: Observable<ProgressItem[]>;

  markCompleteEntities$: Observable<Dictionary<MarkCompleteItem>>;
  constructor(private sharedStore: Store<SharedState>, private completionStore: Store<CompletionState>) { }

  ngOnInit() {
    this.historyGroupings$ = this.sharedStore.select(sharedSelectors.historyGroupingsByGame);
    this.games$ = this.historyGroupings$.map(groupings => groupings.map(item => item.key));

    this.addPlayingInfo$ = this.completionStore.select(completionSelectors.addPlayingInfo);
    this.game$ = this.addPlayingInfo$.map(info => info.game ? info.game : null);

    this.playing$ = this.sharedStore.select(sharedSelectors.progressPlaying);
    this.completed$ = this.sharedStore.select(sharedSelectors.progressCompleted);

    this.markCompleteEntities$ = this.completionStore.select(completionSelectors.markCompleteEntities);
  }
}
