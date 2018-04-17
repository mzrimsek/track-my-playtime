import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { insertAnalyticsElements } from 'insert-analytics-elements/googleTagManager';

import * as actions from './actions/app.actions';

import { State } from './reducers/root.reducer';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store<State>, private router: Router) {
    this.store.dispatch(new actions.InitializeApplication());
    this.insertGoogleTagManagerElements(environment.googleTagManager);
  }

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.indexOf('/app') === -1;
  }

  private insertGoogleTagManagerElements(googleTagManagerContainerId: string) {
    try {
      insertAnalyticsElements(googleTagManagerContainerId);
    } catch (err) {
      this.store.dispatch(new actions.Error('Append Google Tag Manager Scripts', err.message));
    }
  }
}
