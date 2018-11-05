import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as appActions from '../../../../actions/app.actions';
import * as actions from '../../actions/add-playing.actions';

import { State } from '../../reducers/root.reducer';

import { HistoryGrouping } from '../../../../shared/models';
import { AddPlaying, AddPlayingInfo } from '../../models';

import { findMatchingHistoryEntry } from '../../utils/add-playing.utils';

@Component({
  selector: 'app-completion-add-playing',
  templateUrl: './add-playing.component.html',
  styleUrls: ['./add-playing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPlayingComponent implements OnInit {

  @Input() gameGroupings: HistoryGrouping[] = [];
  @Input() games: string[];
  @Input() game: string | null = null;
  @Input() info: AddPlayingInfo;
  @Input() platforms: string[] = [];
  @Input() dates: number[] = [];
  userId = '';
  icons = {
    add: faPlusSquare
  };
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.userId = user.uid);
  }

  setGame() {
    if (this.game) {
      const game = this.game;
      this.store.dispatch(new actions.SetGame(game));
    }
  }

  setPlatform(platformEl: HTMLSelectElement) {
    const platform = platformEl.value;
    this.store.dispatch(new actions.SetPlatform(platform));
  }

  setStartTime(startTimeEl: HTMLSelectElement) {
    const startTime = Number.parseInt(startTimeEl.value, 10);
    this.store.dispatch(new actions.SetStartTime(startTime));
  }

  resetInfo() {
    this.store.dispatch(new actions.Reset());
  }

  savePlaying() {
    const historyItem = findMatchingHistoryEntry(this.gameGroupings, this.info);
    if (historyItem) {
      const addPlaying: AddPlaying = {
        userId: this.userId,
        startEntryId: historyItem.id
      };
      this.store.dispatch(new actions.Save(addPlaying));
    } else {
      this.store.dispatch(new appActions.Error(actions.SAVE, 'No matching history item found.'));
    }
  }
}
