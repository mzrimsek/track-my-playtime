import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClockService } from './services/clock.service';
import { TimerInfo, HistoryListItem } from './models';
import trackerComponentSelectors, { State } from './reducers';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerInfo$: Observable<TimerInfo>;
  currentTime$: Observable<Date>;
  historyItems$: Observable<HistoryListItem[]>;
  constructor(private store: Store<State>, private clockService: ClockService) { }

  ngOnInit() {
    this.timerInfo$ = this.store.select(trackerComponentSelectors.timerInfo);
    this.currentTime$ = this.clockService.getClock();
    this.historyItems$ = this.store.select(trackerComponentSelectors.historyItems);
  }
}
