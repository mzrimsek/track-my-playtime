import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import trackerComponentSelectors, { State } from './reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  timerActive$: Observable<boolean>;
  timerGame$: Observable<string>;
  timerPlatform$: Observable<string>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.timerActive$ = this.store.select(trackerComponentSelectors.timerActive);
    this.timerGame$ = this.store.select(trackerComponentSelectors.timerGame);
    this.timerPlatform$ = this.store.select(trackerComponentSelectors.timerPlatform);
  }
}
