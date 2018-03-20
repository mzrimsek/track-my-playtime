import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HistoryListItem } from '../../models';

@Component({
  selector: 'app-tracker-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit {

  @Input() items: HistoryListItem[] = [];
  @Input() platformsOptions: string[] = [];
  constructor() { }

  ngOnInit() { }
}
