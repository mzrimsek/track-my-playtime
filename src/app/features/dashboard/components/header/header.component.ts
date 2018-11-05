import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import * as actions from '../../actions/date-range.actions';

import { State } from '../../reducers/root.reducer';

import { DateRangeType } from '../../models';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() rangeType: DateRangeType = 'THIS_WEEK';
  @Input() totalTime = 0;
  constructor(private store: Store<State>) { }

  updateDateRange(dateRangeEl: HTMLSelectElement) {
    switch (dateRangeEl.value) {
      case 'THIS_WEEK': {
        this.store.dispatch(new actions.SetThisWeek());
        break;
      }
      case 'LAST_WEEK': {
        this.store.dispatch(new actions.SetLastWeek());
        break;
      }
      case 'THIS_MONTH': {
        this.store.dispatch(new actions.SetThisMonth());
        break;
      }
      case 'LAST_MONTH': {
        this.store.dispatch(new actions.SetLastMonth());
        break;
      }
      default: {
        this.store.dispatch(new actions.SetThisWeek());
      }
    }
  }
}
