import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClockService } from './services/clock.service';
import trackerComponentSelectors, { State } from './reducers';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';

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
  elapsedTime$: Observable<string>;
  constructor(private store: Store<State>, private clockService: ClockService) { }

  ngOnInit() {
    this.timerActive$ = this.store.select(trackerComponentSelectors.timer.active);
    this.timerGame$ = this.store.select(trackerComponentSelectors.timer.game);
    this.timerPlatform$ = this.store.select(trackerComponentSelectors.timer.platform);
    this.timerPlatforms$ = this.store.select(trackerComponentSelectors.timer.platforms);

    const timerStartDate$ = this.store.select(trackerComponentSelectors.timer.startDate);
    const currentTime$ = this.clockService.getClock();
    this.elapsedTime$ = timerStartDate$.combineLatest(currentTime$).map(([startDate, currentTime]) => {
      return this.getElapsedTime(startDate, currentTime);
    });
  }

  getElapsedTime(startDate: Date, currentTime: Date): string {
    if (this.isValidDate(startDate) && this.isValidDate(currentTime) && startDate.getTime() <= currentTime.getTime()) {
      const elapsedTime = currentTime.valueOf() - startDate.valueOf();
      return new Date(elapsedTime).toISOString().substring(11, 19);
    }
    return '00:00:00';
  }

  isValidDate(date: Date): boolean {
    return !isNaN(date.getTime()) && date.getTime() !== new Date(0).getTime();
  }
}
