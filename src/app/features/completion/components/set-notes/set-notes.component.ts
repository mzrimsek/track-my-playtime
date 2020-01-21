import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { State } from 'features/completion/reducers/root.reducer';
import * as progressActions from 'shared/actions/progress.actions';

import { UserService } from 'features/auth/services/user.service';

import { SetNotesPayload } from 'shared/models';

@Component({
  selector: 'app-completion-set-notes',
  templateUrl: './set-notes.component.html',
  styleUrls: ['./set-notes.component.scss']
})
export class SetNotesComponent implements OnInit {

  @Input() itemId = '';
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

  setNotes(notesEl: HTMLInputElement) {
    const notes = notesEl.value;
    notesEl.value = '';

    const payload: SetNotesPayload = {
      itemId: this.itemId,
      notes
    };
    this.store.dispatch(new progressActions.SetNotes(this.userId, payload));
    this.emitFinishEdit();
  }
}
