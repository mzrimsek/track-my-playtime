import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import * as appActions from 'app/actions/app.actions';
import * as markCompleteActions from 'features/completion/actions/mark-complete.actions';
import { State } from 'features/completion/reducers/root.reducer';
import * as progressActions from 'shared/actions/progress.actions';

import { UserService } from 'features/auth/services/user.service';

import { PlayingDisplayData } from 'features/completion/models';
import { HistoryGrouping } from 'shared/models';

import { getEndItem } from 'features/completion/utils/playing.utils';

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
    this.userService.getUser().subscribe(user => this.userId = user.uid);
  }

  toggleShowExtra() {
    this.store.dispatch(new markCompleteActions.SetShowExtra(this.displayData.item.id, !this.displayData.markComplete.showExtra));
  }

  remove() {
    this.store.dispatch(new progressActions.RemoveProgressItem(this.userId, this.displayData.item.id));
  }

  setEndTime(endTimeEl: HTMLSelectElement) {
    const endTime = Number.parseInt(endTimeEl.value, 10);
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
