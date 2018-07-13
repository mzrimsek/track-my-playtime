import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as appActions from '../../../../actions/app.actions';
import * as progressActions from '../../../../shared/actions/progress.actions';
import * as markCompleteActions from '../../actions/mark-complete.actions';

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
  userId = '';
  icons = {
    complete: faCheck,
    close: faTimes,
    remove: faTrash
  };
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUser().uid;
  }

  toggleShowExtra() {
    this.store.dispatch(new markCompleteActions.SetShowExtra(this.displayData.item.id, !this.displayData.markComplete.showExtra));
  }

  remove() {
    this.store.dispatch(new progressActions.RemoveProgressItem(this.userId, this.displayData.item.id));
  }

  setEndTime(endTimeEl: HTMLSelectElement) {
    const endTime = Number.parseInt(endTimeEl.value);
    this.store.dispatch(new markCompleteActions.SetEndTime(this.displayData.item.id, endTime));
  }

  markComplete() {
    const endItem = getEndItem(this.gameGroupings, this.displayData.startEntryData, this.displayData.markComplete.endTime);
    if (endItem) {
      this.store.dispatch(new progressActions.MarkComplete(this.userId, {
        itemId: this.displayData.item.id,
        endEntryId: endItem.id
      }));
    } else {
      this.store.dispatch(new appActions.Error(progressActions.MARK_COMPLETE, 'No matching history item found.'));
    }
  }
}
