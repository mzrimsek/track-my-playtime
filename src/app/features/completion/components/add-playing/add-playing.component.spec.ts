import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { AddPlayingComponent } from './add-playing.component';

import * as actions from '../../actions/add-playing.actions';

import * as fromRoot from '../../../../reducers/root.reducer';
import * as fromCompletion from '../../reducers/root.reducer';

describe('AddPlayingComponent', () => {
  let store: Store<fromRoot.State>;
  let component: AddPlayingComponent;
  let fixture: ComponentFixture<AddPlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlayingComponent],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'completion': combineReducers(fromCompletion.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(AddPlayingComponent);
    component = fixture.componentInstance;
    component.info = {
      game: '',
      platform: '',
      startTime: 0
    };
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('Game Value Changes', () => {
    const game = 'some crazy new game';
    let gameEl: any;

    beforeEach(async(() => {
      gameEl = fixture.nativeElement.querySelector('.game ng-select');
      component.game = game;
      gameEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }));

    it('Should dispatch SetGame', async(() => {
      const action = new actions.SetGame(game);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));

    it('Should update platforms', async(() => {
      fail();
    }));
  });

  describe('Game Value Clears', () => {
    let gameEl: any;

    beforeEach(async(() => {
      gameEl = fixture.nativeElement.querySelector('.game ng-select');
      component.game = null;
      gameEl.dispatchEvent(new Event('clear'));
      fixture.detectChanges();
    }));

    it('Should dispatch Reset', async(() => {
      const action = new actions.Reset();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    }));
  });

  describe('Platform Option Changes', () => {
    let platformEl: any;

    beforeEach(async(() => {
      platformEl = fixture.nativeElement.querySelector('.platform select');
      platformEl.selectedIndex = 2;
      platformEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }));

    it('Should dispatch SetPlatform', async(() => {
      fail();
    }));

    it('Should update dates', async(() => {
      fail();
    }));
  });

  describe('StartTime Option Changes', () => {
    let startTimeEl: any;

    beforeEach(async(() => {
      startTimeEl = fixture.nativeElement.querySelector('.startTime select');
      startTimeEl.selectedIndex = 2;
      startTimeEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }));

    it('Should dispatch SetStartTime', async(() => {
      fail();
    }));
  });
});
