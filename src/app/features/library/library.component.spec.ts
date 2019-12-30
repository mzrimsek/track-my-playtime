import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { LibraryComponent } from './library.component';

import { TimePipe } from '../../shared/pipes/time.pipe';

import * as fromRoot from '../../reducers/root.reducer';
import * as fromShared from '../../shared/reducers/root.reducer';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  let store: Store<fromShared.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LibraryComponent,
        TimePipe
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

    spyOn(component, 'setNumEntriesToShow');

    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should select groupings by game', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryGroupingsByGame);
  });

  it('Should call setNumEntriesToShow', () => {
    expect(component.setNumEntriesToShow).toHaveBeenCalled();
  });

  it('Should call setNumEntriesToShow when onResize is called ', () => {
    window.dispatchEvent(new Event('resize'));
    expect(component.setNumEntriesToShow).toHaveBeenCalled();
  });
});
