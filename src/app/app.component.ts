import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { RouteEntry } from './components/nav/nav.component';

import { State } from './reducers';
import * as actions from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private store: Store<State>) {
    this.store.dispatch(new actions.InitializeApplication());
  }

  routes: RouteEntry[] = [
    {
      caption: 'Tracker',
      router: ['tracker'],
      exact: true
    }
  ];
}
