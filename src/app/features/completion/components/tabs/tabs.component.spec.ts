import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromRoot from 'app/reducers/root.reducer';
import * as tabActions from 'features/completion/actions/tab.actions';
import * as fromCompletion from 'features/completion/reducers/root.reducer';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let store: Store<fromRoot.State>;
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'completion': combineReducers(fromCompletion.reducers)
        })
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Playing Tab Clicked', () => {
    it('Should dispatch SetVisibleTab with "Playing"', () => {
      const playingTab = fixture.nativeElement.querySelector('.tabs .playing');
      const action = new tabActions.SetVisibleTab('PLAYING');

      playingTab.click();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('Completed Tab Clicked', () => {
    it('Should dispatch SetVisibleTab with "Completed"', () => {
      const completedTab = fixture.nativeElement.querySelector('.tabs .completed');
      const action = new tabActions.SetVisibleTab('COMPLETED');

      completedTab.click();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
