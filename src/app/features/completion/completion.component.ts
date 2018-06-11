import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import sharedSelectors, { State as SharedState } from '../../shared/reducers/root.reducer';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.scss']
})
export class CompletionComponent implements OnInit {

  trackedGames$: Observable<string[]>;
  platformsOptions$: Observable<string[]>;
  constructor(private sharedStore: Store<SharedState>) { }

  ngOnInit() {
    this.trackedGames$ = this.sharedStore.select(sharedSelectors.historyTrackedGames);
    this.platformsOptions$ = this.sharedStore.select(sharedSelectors.platformsOptions);
  }
}
