import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import trackerComponentSelectors, { State } from '../reducers/root.reducer';

import { HistoryGrouping } from '../models';

@Injectable()
export class TrackerService {

  constructor(private store: Store<State>) { }

  getHistoryGroupingsByDate(): Observable<HistoryGrouping[]> {
    return this.store.select(trackerComponentSelectors.historyGroupingsByDate);
  }
}
