import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { insertAnalyticsElements } from 'insert-analytics-elements/googleTagManager';
import { Observable } from 'rxjs';

import { ElapsedTimeService } from './shared/services/elapsed-time.service';

import sharedSelectors, { State as SharedState } from './shared/reducers/root.reducer';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userDataLoaded$: Observable<boolean>;
  trackerNavCaption$: Observable<string>;
  constructor(private sharedStore: Store<SharedState>,
    private router: Router,
    private titleService: Title,
    private elapsedTimeService: ElapsedTimeService) { }

  ngOnInit() {
    insertAnalyticsElements(environment.googleTagManager);
    this.userDataLoaded$ = this.sharedStore.select(sharedSelectors.userDataLoaded);
    this.elapsedTimeService.getElapsedTime('Track My Playtime').subscribe(title => this.titleService.setTitle(title));
    this.trackerNavCaption$ = this.elapsedTimeService.getElapsedTime('Tracker');
  }

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.indexOf('/app') === -1;
  }
}
