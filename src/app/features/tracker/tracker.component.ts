import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { UserService } from '../auth/services/user.service';
import { ClockService } from './services/clock.service';

import trackerComponentSelectors, { State } from './reducers/root.reducer';

import { User } from '../auth/models';
import { HistoryGrouping, TimerInfo } from './models';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerInfo$: Observable<TimerInfo>;
  currentTime$: Observable<number>;
  platformsOptions$: Observable<string[]>;
  user$: Observable<User>;

  historyGroupings$: Observable<HistoryGrouping[]>;
  historyLoading$: Observable<boolean>;
  constructor(private store: Store<State>, private clockService: ClockService, private userService: UserService) { }

  ngOnInit() {
    this.timerInfo$ = this.store.select(trackerComponentSelectors.timerInfo);
    this.currentTime$ = this.clockService.getCurrentTime();
    this.platformsOptions$ = this.store.select(trackerComponentSelectors.platformsOptions);
    this.user$ = this.userService.getUser();

    this.historyGroupings$ = this.store.select(trackerComponentSelectors.historyGroupings);
    this.historyLoading$ = this.store.select(trackerComponentSelectors.historyLoading);
  }
}
