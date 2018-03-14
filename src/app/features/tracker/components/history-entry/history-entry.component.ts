import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { HistoryListItem } from '../../models';
import { State } from '../../reducers';
import * as actions from '../../actions/history.actions';

@Component({
  selector: 'app-tracker-history-entry',
  templateUrl: './history-entry.component.html',
  styleUrls: ['./history-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryEntryComponent implements OnInit {

  @Input() item: HistoryListItem;
  @Input() platformsOptions: string[];
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  updateGame(gameEl: HTMLInputElement) {
    if (gameEl.value) {
      this.store.dispatch(new actions.UpdateGame(this.item.id, gameEl.value));
    }
  }

  updatePlatform(platformEl: HTMLSelectElement) {
    if (platformEl.value) {
      this.store.dispatch(new actions.UpdatePlatform(this.item.id, platformEl.value));
    }
  }

  remove() {
    this.store.dispatch(new actions.RemoveHistoryItem(this.item.id));
  }
}
