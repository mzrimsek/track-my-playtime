import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faLock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';
import { TimerService } from '../../services/timer.service';

import * as timerActions from '../../../../shared/actions/timer.actions';

import { State } from '../../reducers/root.reducer';

import { HistoryListItem, TimerInfo } from '../../../../shared/models';

@Component({
  selector: 'app-tracker-locked-history-entry',
  templateUrl: './locked-history-entry.component.html',
  styleUrls: ['./locked-history-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockedHistoryEntryComponent implements OnInit {

  @Input() item: HistoryListItem;
  userId = '';
  icons = {
    lock: faLock,
    quickStart: faPlay
  };
  constructor(private store: Store<State>, private userService: UserService, private timerService: TimerService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.userId = user.uid);
  }

  quickStart() {
    const timerInfo: TimerInfo = {
      game: this.item.game,
      platform: this.item.platform,
      startTime: this.timerService.getNowTime()
    };
    this.store.dispatch(new timerActions.SetTimerInfo(timerInfo));
    this.timerService.setTimer(this.userId, timerInfo);
  }
}
