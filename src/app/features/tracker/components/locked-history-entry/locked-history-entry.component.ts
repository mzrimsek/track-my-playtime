import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { faLock } from '@fortawesome/free-solid-svg-icons';

import { HistoryListItem } from '../../../../shared/models';

@Component({
  selector: 'app-tracker-locked-history-entry',
  templateUrl: './locked-history-entry.component.html',
  styleUrls: ['./locked-history-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockedHistoryEntryComponent implements OnInit {

  @Input() item: HistoryListItem;
  icons = {
    lock: faLock
  };
  constructor() { }

  ngOnInit() { }
}
