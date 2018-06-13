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
      this.updatePlatforms();
    }
  }

  setPlatform(platformEl: HTMLSelectElement) {
    if (platformEl.value) {
      const platform = platformEl.value;
      this.store.dispatch(new actions.SetPlatform(platform));
      this.updateDates(platform);
    }
  }

  setStartTime(startTimeEl: HTMLSelectElement) {
    if (startTimeEl.value) {
      const startTime = Number.parseInt(startTimeEl.value);
      this.store.dispatch(new actions.SetStartTime(startTime));
    }
  }

  resetInfo() {
    this.store.dispatch(new actions.Reset());
    this.platforms = [];
    this.dates = [];
  }

  // TODO: Move these into a utils file
  private updatePlatforms() {
    const selectedGameGrouping = this.gameGroupings.find(grouping => grouping.key === this.game);
    this.platforms = selectedGameGrouping ? getUniqueFrom(selectedGameGrouping.historyItems, item => item.platform) : [];
  }

  private updateDates(platform: string) {
    const selectedGameGrouping = this.gameGroupings.find(grouping => grouping.key === this.game);
    this.dates = selectedGameGrouping ? selectedGameGrouping.historyItems
      .filter(item => item.platform === platform)
      .map(item => item.startTime).reverse() : [];
  }
}
