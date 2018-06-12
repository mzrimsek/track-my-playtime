import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { HistoryGrouping } from '../../../shared/models';
import { AddPlayingGame } from '../models';

import { getUniqueFrom } from '../../../shared/utils/history.utils';

@Component({
  selector: 'app-completion-add-playing',
  templateUrl: './add-playing.component.html',
  styleUrls: ['./add-playing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPlayingComponent implements OnInit {

  @Input() gameGroupings: HistoryGrouping[] = [];
  platforms: string[] = [];
  dates: number[] = [];
  info: AddPlayingGame = {
    game: '',
    platform: '',
    startTime: 0
  };
  constructor() { }

  ngOnInit() { }

  getGames() {
    return this.gameGroupings.map(item => item.key);
  }

  updateSelection() {
    const groupingForSelectedGame = this.gameGroupings.find(grouping => grouping.key === this.info.game);
    this.platforms = groupingForSelectedGame ? getUniqueFrom(groupingForSelectedGame.historyItems, item => item.platform) : [];
    this.dates = groupingForSelectedGame ? groupingForSelectedGame.historyItems.map(item => item.startTime).reverse() : [];
  }
}
