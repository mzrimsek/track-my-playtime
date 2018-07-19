import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { LibraryComponent } from './library.component';

import * as historyActions from '../../shared/actions/history.actions';

import * as fromRoot from '../../reducers/root.reducer';
import * as fromShared from '../../shared/reducers/root.reducer';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  let store: Store<fromShared.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LibraryComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'shared': combineReducers(fromShared.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should select groupings by game', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryGroupingsByGame);
  });

  describe('When data is loading', () => {
    beforeEach(async(() => {
      store.dispatch(new historyActions.LoadHistoryItems(''));
      fixture.detectChanges();
    }));

    it('Should show loading spinner', async(() => {
      const spinner = fixture.nativeElement.querySelector('app-shared-spinner');
      expect(spinner).toBeTruthy();
    }));

    it('Should not show library', async(() => {
      const library = fixture.nativeElement.querySelector('.library');
      expect(library).toBeNull();
    }));
  });

  describe('When data is loaded', () => {
    beforeEach(async(() => {
      store.dispatch(new historyActions.LoadHistoryItemsSucceeded([]));
      fixture.detectChanges();
    }));

    it('Should not show loading spinner', async(() => {
      const spinner = fixture.nativeElement.querySelector('app-shared-spinner');
      expect(spinner).toBeNull();
    }));

    it('Should show library', async(() => {
      const library = fixture.nativeElement.querySelector('.library');
      expect(library).toBeTruthy();
    }));
  });
});
