import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as actions from './actions/app.actions';

import { State } from './reducers/root.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private store: Store<State>, private router: Router) {
    this.store.dispatch(new actions.InitializeApplication());
  }

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.indexOf('/app') === -1;
  }
}
