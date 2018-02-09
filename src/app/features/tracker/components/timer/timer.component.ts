import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as actions from '../../actions/timer';

@Component({
  selector: 'app-tracker-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  @Input() active: boolean;
  @Input() game: string;
  @Input() platform: string;
  @Input() platforms: string[];
  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  startTimer() {
    this.store.dispatch(new actions.TimerStart());
  }

  stopTimer() {
    this.store.dispatch(new actions.TimerStop());
  }

  setGame(gameEl: HTMLInputElement) {
    if (gameEl.value) {
      this.store.dispatch(new actions.SetGame(gameEl.value));

    }
  }

  setPlatform(platformEl: HTMLSelectElement) {
    if (platformEl.value) {
      this.store.dispatch(new actions.SetPlatform(platformEl.value));
    }
  }
}
