import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from '../../actions/add-playing.actions';

import { State } from '../../reducers/root.reducer';

import { HistoryGrouping } from '../../../../shared/models';
import { AddPlaying } from '../../models';

import { getUniqueFrom } from '../../../../shared/utils/history.utils';

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
  @Input() info: AddPlaying;
  platforms: string[] = [];
  dates: number[] = [];
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  setGame() {
    if (this.game) {
      const game = this.game;
      this.store.dispatch(new actions.SetGame(game));
      this.updateOptions();
    }
  }

  setPlatform(platformEl: HTMLSelectElement) {
    if (platformEl.value) {
      const platform = platformEl.value;
      this.store.dispatch(new actions.SetPlatform(platform));
    }
  }

  resetPlatform() {
    this.store.dispatch(new actions.SetPlatform(''));
  }

  setStartTime(startTimeEl: HTMLSelectElement) {
    if (startTimeEl.value) {
      const startTime = Number.parseInt(startTimeEl.value);
      this.store.dispatch(new actions.SetStartTime(startTime));
    }
  }

  resetInfo() {
    this.store.dispatch(new actions.SetGame(''));
    this.store.dispatch(new actions.SetPlatform(''));
    this.store.dispatch(new actions.SetStartTime(0));
    this.updateOptions();
  }

  private updateOptions() {
    const selectedGameGrouping = this.gameGroupings.find(grouping => grouping.key === this.game);
    this.platforms = selectedGameGrouping ? getUniqueFrom(selectedGameGrouping.historyItems, item => item.platform) : [];
    this.dates = selectedGameGrouping ? selectedGameGrouping.historyItems.map(item => item.startTime).reverse() : [];
  }
}
