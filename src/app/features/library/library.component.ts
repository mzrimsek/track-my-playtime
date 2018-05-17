import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import sharedSelectors, { State as SharedState } from '../../shared/reducers/root.reducer';

import { LibraryEntry } from './models';

import { mapGroupings } from './utils/library-data.utils';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  libraryEntries$: Observable<LibraryEntry[]>;
  constructor(private sharedStore: Store<SharedState>) { }

  ngOnInit() {
    const gameGroupings = this.sharedStore.select(sharedSelectors.historyGroupingsByGame);
    this.libraryEntries$ = mapGroupings(gameGroupings);
  }
}
