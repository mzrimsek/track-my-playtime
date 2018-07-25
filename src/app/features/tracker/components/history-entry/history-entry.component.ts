import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';
import { TimerService } from '../../services/timer.service';

import * as historyActions from '../../../../shared/actions/history.actions';
import * as timerActions from '../../actions/timer.actions';

import { State } from '../../reducers/root.reducer';

import {
    HistoryListItem, UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload,
    UpdateHistoryItemTimesPayload
} from '../../../../shared/models';
import { TimerInfo } from '../../models';

@Component({
  selector: 'app-tracker-history-entry',
  templateUrl: './history-entry.component.html',
  styleUrls: ['./history-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryEntryComponent implements OnInit {

  @Input() item: HistoryListItem;
  @Input() platformsOptions: string[] = [];
  @Input() trackedGames: string[] = [];
  @Input() game: string | null = null;
  userId = '';
  icons = {
    remove: faTrash,
    quickStart: faPlay
  };
  constructor(private store: Store<State>, private userService: UserService, private timerService: TimerService) { }

  ngOnInit() {
    this.userId = this.userService.getUser().uid;
  }

  updateGame() {
    if (this.game) {
      const payload = <UpdateHistoryItemGamePayload>{
        itemId: this.item.id,
        game: this.game
      };
      this.store.dispatch(new historyActions.UpdateGame(this.userId, payload));
    }
  }

  updatePlatform(platformEl: HTMLSelectElement) {
    const payload = <UpdateHistoryItemPlatformPayload>{
      itemId: this.item.id,
      platform: platformEl.value
    };
    this.store.dispatch(new historyActions.UpdatePlatform(this.userId, payload));
  }

  quickStart() {
    const timerInfo: TimerInfo = {
      game: this.item.game,
      platform: this.item.platform,
      startTime: this.getNowTime()
    };
    this.store.dispatch(new timerActions.SetTimerInfo(timerInfo));
    this.timerService.setTimer(this.userId, timerInfo);
  }

  remove() {
    this.store.dispatch(new historyActions.RemoveHistoryItem(this.userId, this.item.id));
  }

  updateElapsedTime(elapsedTimeEl: HTMLInputElement) {
    if (elapsedTimeEl.value) {
      const dateStrings = elapsedTimeEl.value.split('~').map(dateString => dateString.trim());
      const startTime = new Date(dateStrings[0]).getTime();
      const endTime = new Date(dateStrings[1]).getTime();

      const payload = <UpdateHistoryItemTimesPayload>{
        itemId: this.item.id,
        startTime,
        endTime
      };
      this.store.dispatch(new historyActions.UpdateElapsedTime(this.userId, payload));
    }
  }

  openDateTimePicker(el: HTMLInputElement) {
    el.click();
  }

  getNowTime(): number {
    return new Date().getTime();
  }
}
