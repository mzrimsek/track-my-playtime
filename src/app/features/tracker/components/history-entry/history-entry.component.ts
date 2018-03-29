import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from '../../actions/history.actions';

import { State } from '../../reducers/root.reducer';

import { HistoryListItem } from '../../models';

@Component({
  selector: 'app-tracker-history-entry',
  templateUrl: './history-entry.component.html',
  styleUrls: ['./history-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryEntryComponent implements OnInit {

  @Input() item: HistoryListItem;
  @Input() platformsOptions: string[] = [];
  @Input() dateRange: Date[] = [];
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  updateGame(gameEl: HTMLInputElement) {
    if (gameEl.value) {
      this.store.dispatch(new actions.UpdateGame(this.item.id, gameEl.value));
    }
  }

  updatePlatform(platformEl: HTMLSelectElement) {
    if (platformEl.value) {
      this.store.dispatch(new actions.UpdatePlatform(this.item.id, platformEl.value));
    }
  }

  remove() {
    this.store.dispatch(new actions.RemoveHistoryItem(this.item.id));
  }

  updateElapsedTime(elapsedTimeEl: HTMLInputElement) {
    if (elapsedTimeEl.value) {
      const dateStrings = elapsedTimeEl.value.split('~').map(dateString => dateString.trim());
      const startTime = new Date(dateStrings[0]).getTime();
      const endTime = new Date(dateStrings[1]).getTime();
      this.store.dispatch(new actions.UpdateElapsedTime(this.item.id, startTime, endTime));
    }
  }

  openDateTimePicker(el: HTMLInputElement) {
    el.click();
  }
}
