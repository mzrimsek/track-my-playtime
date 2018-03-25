import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClockService } from './services/clock.service';
import { UserService } from '../auth/services/user.service';
import { TimerInfo, HistoryListItem } from './models';
import { User } from '../auth/models';
import trackerComponentSelectors, { State } from './reducers/root.reducer';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerInfo$: Observable<TimerInfo>;
  currentTime$: Observable<number>;
  historyItems$: Observable<HistoryListItem[]>;
  platformsOptions$: Observable<string[]>;
  user$: Observable<User>;
  constructor(private store: Store<State>, private clockService: ClockService, private userService: UserService) { }

  ngOnInit() {
    this.timerInfo$ = this.store.select(trackerComponentSelectors.timerInfo);
    this.currentTime$ = this.clockService.getCurrentTime();
    this.historyItems$ = this.store.select(trackerComponentSelectors.historyItems);
    this.platformsOptions$ = this.store.select(trackerComponentSelectors.platformsOptions);
    this.user$ = this.userService.getUser();
  }
}
