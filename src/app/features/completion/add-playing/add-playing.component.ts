import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { HistoryGrouping } from '../../../shared/models';
import { AddPlayingGame } from '../models';

@Component({
  selector: 'app-completion-add-playing',
  templateUrl: './add-playing.component.html',
  styleUrls: ['./add-playing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPlayingComponent implements OnInit {

  @Input() gameGroupings: HistoryGrouping[] = [];
  platforms: string[] = [];
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

  setPlatforms() {
    const groupingForSelectedGame = this.gameGroupings.find(grouping => grouping.key === this.info.game);
    if (groupingForSelectedGame) {
      const platformsForSelectedGame = groupingForSelectedGame.historyItems.map(item => item.platform);
      this.platforms = Array.from(new Set(platformsForSelectedGame));
    } else {
      this.platforms = [];
    }
  }
}
