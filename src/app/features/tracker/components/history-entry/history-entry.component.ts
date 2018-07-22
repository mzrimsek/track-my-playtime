import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as actions from '../../../../shared/actions/history.actions';

import { State } from '../../reducers/root.reducer';

import {
    HistoryListItem, UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload,
    UpdateHistoryItemTimesPayload
} from '../../../../shared/models';

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
    remove: faTrash
  };
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUser().uid;
  }

  updateGame() {
    if (this.game) {
      const payload = <UpdateHistoryItemGamePayload>{
        itemId: this.item.id,
        game: this.game
      };
      this.store.dispatch(new actions.UpdateGame(this.userId, payload));
    }
  }

  updatePlatform(platformEl: HTMLSelectElement) {
    const payload = <UpdateHistoryItemPlatformPayload>{
      itemId: this.item.id,
      platform: platformEl.value
    };
    this.store.dispatch(new actions.UpdatePlatform(this.userId, payload));
  }

  remove() {
    this.store.dispatch(new actions.RemoveHistoryItem(this.userId, this.item.id));
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
      this.store.dispatch(new actions.UpdateElapsedTime(this.userId, payload));
    }
  }

  openDateTimePicker(el: HTMLInputElement) {
    el.click();
  }
}
