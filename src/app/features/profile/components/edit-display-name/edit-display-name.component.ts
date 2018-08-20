import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { UserService } from '../../../auth/services/user.service';

import * as profileActions from '../../actions/profile.actions';

import { State } from '../../reducers/root.reducer';

@Component({
  selector: 'app-profile-edit-display-name',
  templateUrl: './edit-display-name.component.html',
  styleUrls: ['./edit-display-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDisplayNameComponent implements OnInit {

  @Output() finishEdit: EventEmitter<null> = new EventEmitter();
  userId: string;
  icons = {
    confirm: faCheck,
    cancel: faTimes
  };
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.userId = user.uid);
  }

  emitFinishEdit() {
    this.finishEdit.emit(null);
  }

  setDisplayName(displayNameEl: HTMLInputElement) {
    const displayName = displayNameEl.value;
    displayNameEl.value = '';

    this.store.dispatch(new profileActions.SetProfileDisplayName(this.userId, displayName));
    this.emitFinishEdit();
  }
}
