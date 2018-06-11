import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { AddPlayingGame } from '../models';

@Component({
  selector: 'app-completion-add-playing',
  templateUrl: './add-playing.component.html',
  styleUrls: ['./add-playing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPlayingComponent implements OnInit {

  @Input() trackedGames: string[] = [];
  @Input() platformsOptions: string[] = [];
  info: AddPlayingGame;
  constructor() { }

  ngOnInit() { }
}
