import { Component, HostListener, OnInit } from '@angular/core';

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
  numEntriesToShow = 10;
  constructor(private sharedStore: Store<SharedState>) { }

  ngOnInit() {
    const gameGroupings = this.sharedStore.select(sharedSelectors.historyGroupingsByGame);
    this.libraryEntries$ = mapGroupings(gameGroupings);
    this.setNumEntriesToShow(window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setNumEntriesToShow(window.innerHeight);
  }

  setNumEntriesToShow(height: number) {
    let numToShow = 10;
    if (height > 800) {
      numToShow = height / 70;
    } else if (height > 700) {
      numToShow = height / 90;
    } else {
      numToShow = height / 110;
    }
    this.numEntriesToShow = Math.floor(numToShow);
  }
}
