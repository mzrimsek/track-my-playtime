import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from '../../actions/tab.actions';

import { State } from '../../reducers/root.reducer';

import { TabType } from '../../models';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit {

  @Input() visibleTab: TabType = 'PLAYING';
  @Input() playingCount = 0;
  @Input() completedCount = 0;
  constructor(private store: Store<State>) { }

  ngOnInit() { }

  setVisibleTab(tab: TabType) {
    this.store.dispatch(new actions.SetVisibleTab(tab));
  }
}
