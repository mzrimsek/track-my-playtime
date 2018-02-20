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
  constructor(private store: Store<State>) { }

  ngOnInit() { }
}
