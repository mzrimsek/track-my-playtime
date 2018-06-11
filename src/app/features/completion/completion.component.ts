import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import sharedSelectors, { State as SharedState } from '../../shared/reducers/root.reducer';

import { HistoryGrouping } from '../../shared/models';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.scss']
})
export class CompletionComponent implements OnInit {

  historyItems$: Observable<HistoryGrouping[]>;
  constructor(private sharedStore: Store<SharedState>) { }

  ngOnInit() {
    this.historyItems$ = this.sharedStore.select(sharedSelectors.historyGroupingsByGame);
  }
}
