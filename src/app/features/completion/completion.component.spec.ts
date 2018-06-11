import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { combineReducers, StoreModule } from '@ngrx/store';

import { CompletionComponent } from './completion.component'; 

import * as fromRoot from '../../reducers/root.reducer';
import * as fromShared from '../../shared/reducers/root.reducer';

describe('CompletionComponent', () => {
  let component: CompletionComponent;
  let fixture: ComponentFixture<CompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompletionComponent],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'shared': combineReducers(fromShared.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});