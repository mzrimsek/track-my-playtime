import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { HistoryListItem } from '../../models';
import { State } from '../../reducers';
import * as actions from '../../actions/history';

@Component({
  selector: 'app-tracker-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit {

  @Input() items: HistoryListItem[];
  @Input() platforms: string[];
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  updateGame(id: string, gameEl: HTMLInputElement) {
    if (gameEl.value) {
      this.store.dispatch(new actions.UpdateGame(id, gameEl.value));
    }
  }

  updatePlatform(id: string, platformEl: HTMLSelectElement) {
    if (platformEl.value) {
      this.store.dispatch(new actions.UpdatePlatform(id, platformEl.value));
    }
  }

  remove(id: string) {
    this.store.dispatch(new actions.RemoveHistoryItem(id));
  }
}
