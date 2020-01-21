import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromRoot from 'app/reducers/root.reducer';
import * as fromShared from 'shared/reducers/root.reducer';

import { CompletionComponent } from './completion.component';

import * as fromCompletion from './reducers/root.reducer';

describe('CompletionComponent', () => {
  let component: CompletionComponent;
  let fixture: ComponentFixture<CompletionComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompletionComponent],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'shared': combineReducers(fromShared.reducers),
          'completion': combineReducers(fromCompletion.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(CompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should select history groupings by name', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectHistoryGroupingsByGame);
  });

  it('Should select add playing info', () => {
    expect(store.select).toHaveBeenCalledWith(fromCompletion._selectAddPlayingInfo);
  });

  it('Should select playing progress items', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectPlayingProgress);
  });

  it('Should select completed progress items', () => {
    expect(store.select).toHaveBeenCalledWith(fromShared._selectCompletedProgress);
  });

  it('Should select mark complete entities', () => {
    expect(store.select).toHaveBeenCalledWith(fromCompletion._selectMarkCompleteEntities);
  });
});
