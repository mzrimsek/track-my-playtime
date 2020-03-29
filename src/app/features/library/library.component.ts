import { Component, HostListener, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import sharedSelectors, { State as SharedState } from 'shared/reducers/root.reducer';

import { LibraryEntry } from './models';

import { mapGroupings } from './utils/library-data.utils';

import { getNumEntriesToShow } from './utils/resize-utils';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  libraryEntries$: Observable<LibraryEntry[]>;
  numEntriesToShow = 10;
  constructor(private sharedStore: Store<SharedState>) { }

  ngOnInit() {
    const gameGroupings = this.sharedStore.pipe(select(sharedSelectors.historyGroupingsByGame));
    this.libraryEntries$ = mapGroupings(gameGroupings);
    this.setNumEntriesToShow();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setNumEntriesToShow();
  }

  setNumEntriesToShow() {
    this.numEntriesToShow = getNumEntriesToShow(window.innerHeight);
  }
}
