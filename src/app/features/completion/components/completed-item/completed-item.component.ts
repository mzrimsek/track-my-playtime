import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as progressActions from '../../actions/progress.actions';

import { State } from '../../reducers/root.reducer';

import { CompletedDisplayData } from '../../models';

@Component({
  selector: 'app-completion-completed-item',
  templateUrl: './completed-item.component.html',
  styleUrls: ['./completed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedItemComponent implements OnInit {

  @Input() displayData: CompletedDisplayData;
  userId = '';
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUser().uid;
  }

  remove() {
    this.store.dispatch(new progressActions.RemoveProgressItem(this.userId, this.displayData.item.id));
  }
}