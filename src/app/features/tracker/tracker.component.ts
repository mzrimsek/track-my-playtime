import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClockService } from './services/clock.service';
import { TimerInfo, HistoryListItem } from './models';
import trackerComponentSelectors, { State } from './reducers';
import { getElapsedTime } from '../../utils/dateHelper';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerInfo$: Observable<TimerInfo>;
  elapsedTime$: Observable<string>;
  historyItems$: Observable<HistoryListItem[]>;
  constructor(private store: Store<State>, private clockService: ClockService) { }

  ngOnInit() {
    this.timerInfo$ = this.store.select(trackerComponentSelectors.timerInfo);

    const timerStartDate$ = this.store.select(trackerComponentSelectors.timerStartDate);
    const currentTime$ = this.clockService.getClock();
    this.elapsedTime$ = timerStartDate$.combineLatest(currentTime$)
      .map(([startDate, currentTime]) => getElapsedTime(startDate, currentTime));

    this.historyItems$ = this.store.select(trackerComponentSelectors.historyItems);
  }
}
