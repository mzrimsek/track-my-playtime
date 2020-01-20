import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { State } from 'features/completion/reducers/root.reducer';
import * as progressActions from 'shared/actions/progress.actions';

import { UserService } from 'features/auth/services/user.service';

import { CompletedDisplayData } from 'features/completion/models';

@Component({
  selector: 'app-completion-completed-item',
  templateUrl: './completed-item.component.html',
  styleUrls: ['./completed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedItemComponent implements OnInit {

  @Input() displayData: CompletedDisplayData;
  userId = '';
  editNotes = false;
  icons = {
    edit: faEdit,
    remove: faTrash
  };
  constructor(private store: Store<State>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.userId = user.uid);
  }

  remove() {
    this.store.dispatch(new progressActions.RemoveProgressItem(this.userId, this.displayData.item.id));
  }

  setEditNotes(editNotes: boolean) {
    this.editNotes = editNotes;
  }
}
