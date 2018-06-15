import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as appActions from '../../../../actions/app.actions';
import * as progressActions from '../../actions/progress.actions';

import { State } from '../../reducers/root.reducer';

import { HistoryGrouping } from '../../../../shared/models';
import { DisplayPlaying, PlayingItem } from '../../models';

import { getElapsedTimeFrom } from '../../../../shared/utils/history.utils';

@Component({
  selector: 'app-completion-playing-item',
  templateUrl: './playing-item.component.html',
  styleUrls: ['./playing-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayingItemComponent implements OnInit {

  @Input() displayData: DisplayPlaying;
  @Input() gameGroupings: HistoryGrouping[] = [];
  dates: number[] = [];
  showExtra = false;
  userId = '';
  endTime = 0;
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUser().uid;
  }

  // move this into some utils and test it
  getPlaying(): PlayingItem {
    let timePlayed = 0;
    const gameGrouping = this.gameGroupings.find(grouping => grouping.key === this.displayData.startEntryData.game);
    if (gameGrouping) {
      const filtered = gameGrouping.historyItems.filter(item =>
        item.platform === this.displayData.startEntryData.platform && item.startTime >= this.displayData.startEntryData.startTime);
      this.dates = filtered.map(item => item.endTime);
      timePlayed = getElapsedTimeFrom(filtered);
    }
    return {
      game: this.displayData.startEntryData.game,
      platform: this.displayData.startEntryData.platform,
      startTime: this.displayData.startEntryData.startTime,
      timePlayed
    };
  }

  toggleShowExtra() {
    this.showExtra = !this.showExtra;
  }

  remove() {
    this.store.dispatch(new progressActions.RemoveProgressItem(this.userId, this.displayData.item.id));
  }

  // move this to some utils and test it
  markComplete() {
    const gameGrouping = this.gameGroupings.find(grouping => grouping.key === this.displayData.startEntryData.game);
    if (gameGrouping) {
      const endItem = gameGrouping.historyItems.find(item =>
        item.game === this.displayData.startEntryData.game &&
        item.platform === this.displayData.startEntryData.platform &&
        item.endTime === this.endTime);
      if (endItem) {
        this.store.dispatch(new progressActions.MarkComplete(this.userId, {
          itemId: this.displayData.item.id,
          endEntryId: endItem.id
        }));
      } else {
        this.store.dispatch(new appActions.Error(progressActions.MARK_COMPLETE, 'No matching history item found.'));
      }
    } else {
      this.store.dispatch(new appActions.Error(progressActions.MARK_COMPLETE, 'No matching history grouping found.'));
    }
  }

  setEndTime(endTimeEl: HTMLSelectElement) {
    this.endTime = endTimeEl.value === '0' ? 0 : Number.parseInt(endTimeEl.value);
  }
}
