import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { insertAnalyticsElements } from 'insert-analytics-elements/googleTagManager';
import { Observable } from 'rxjs/Observable';

import * as actions from './actions/app.actions';

import { State as RootState } from './reducers/root.reducer';
import sharedSelectors, { State as SharedState } from './shared/reducers/root.reducer';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userDataLoaded$: Observable<boolean>;
  constructor(private rootStore: Store<RootState>, private sharedStore: Store<SharedState>, private router: Router) { }

  ngOnInit() {
    this.rootStore.dispatch(new actions.InitializeApplication());
    insertAnalyticsElements(environment.googleTagManager);

    this.userDataLoaded$ = this.sharedStore.select(sharedSelectors.userDataLoaded);
  }

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.indexOf('/app') === -1;
  }
}
