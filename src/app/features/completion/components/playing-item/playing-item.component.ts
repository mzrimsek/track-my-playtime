import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as appActions from '../../../../actions/app.actions';
import * as progressActions from '../../actions/progress.actions';

import { State } from '../../reducers/root.reducer';

import { HistoryGrouping } from '../../../../shared/models';
import { PlayingDisplayData } from '../../models';

import { getEndItem } from '../../utils/playing.utils';

@Component({
  selector: 'app-completion-playing-item',
  templateUrl: './playing-item.component.html',
  styleUrls: ['./playing-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayingItemComponent implements OnInit {

  @Input() displayData: PlayingDisplayData;
  @Input() gameGroupings: HistoryGrouping[] = [];
  showExtra = true;
  userId = '';
  endTime = 0;
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUser().uid;
  }

  toggleShowExtra() {
    this.showExtra = !this.showExtra;
  }

  remove() {
    this.store.dispatch(new progressActions.RemoveProgressItem(this.userId, this.displayData.item.id));
  }

  markComplete() {
    const endItem = getEndItem(this.gameGroupings, this.displayData.startEntryData, this.endTime);
    if (endItem) {
      this.store.dispatch(new progressActions.MarkComplete(this.userId, {
        itemId: this.displayData.item.id,
        endEntryId: endItem.id
      }));
    } else {
      this.store.dispatch(new appActions.Error(progressActions.MARK_COMPLETE, 'No matching history item found.'));
    }
  }

  setEndTime(endTimeEl: HTMLSelectElement) {
    this.endTime = endTimeEl.value === '0' ? 0 : Number.parseInt(endTimeEl.value);
  }
}
