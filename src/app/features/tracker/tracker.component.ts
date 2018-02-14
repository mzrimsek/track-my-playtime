import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClockService } from './services/clock.service';
import trackerComponentSelectors, { State } from './reducers';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerActive$: Observable<boolean>;
  timerGame$: Observable<string>;
  timerPlatform$: Observable<string>;
  timerPlatforms$: Observable<string[]>;
  timerStartDate$: Observable<Date | null>;
  currentTime$: Observable<Date>;
  constructor(private store: Store<State>, private clockService: ClockService) { }

  ngOnInit() {
    this.timerActive$ = this.store.select(trackerComponentSelectors.timer.active);
    this.timerGame$ = this.store.select(trackerComponentSelectors.timer.game);
    this.timerPlatform$ = this.store.select(trackerComponentSelectors.timer.platform);
    this.timerPlatforms$ = this.store.select(trackerComponentSelectors.timer.platforms);
    this.timerStartDate$ = this.store.select(trackerComponentSelectors.timer.startDate);
    this.currentTime$ = this.clockService.getClock();
  }
}
