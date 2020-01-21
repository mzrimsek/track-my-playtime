import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';

import { TimePipe } from 'shared/pipes/time.pipe';

import { HistoryGrouping } from 'shared/models';

describe('HistoryComponent', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestWrapperComponent,
        HistoryComponent,
        TimePipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('When groups is empty', () => {
    it('Should show "no groups" element', async(() => {
      const noGroups = fixture.nativeElement.querySelector('.no-groups');
      expect(noGroups).toBeTruthy();
    }));

    it('Should show "no groups" message', async(() => {
      const noGroups = fixture.nativeElement.querySelector('.no-groups');
      expect(noGroups.innerText).toBe('Nothing to show...get tracking!');
    }));

    it('Should not show any groups', async(() => {
      const groups = fixture.nativeElement.querySelector('.groups');
      expect(groups).toBeNull();
    }));
  });

  describe('When groups has data', () => {
    let groups: any;

    beforeEach(async(() => {
      component.groups = [{
        key: '5/2/2018',
        historyItems: [{
          id: '1',
          game: 'some game 2',
          platform: 'some platform',
          startTime: 7000,
          endTime: 10000,
          dateRange: [new Date('5/2/2018'), new Date('5/2/2018')],
          locked: false
        },
        {
          id: '2',
          game: 'some game 2',
          platform: 'some platform 2',
          startTime: 3000,
          endTime: 6000,
          dateRange: [new Date('5/2/2018'), new Date('5/2/2018')],
          locked: false
        }],
        totalTime: 6
      }];
      fixture.detectChanges();
      groups = fixture.nativeElement.querySelector('.groups');
    }));

    it('Should show the correct number of groups', async(() => {
      expect(groups.children.length).toBe(1);
    }));

    describe('Group information', () => {
      let group: any;

      beforeEach(async(() => {
        group = groups.children[0];
      }));

      it('Should have correct date', async(() => {
        const date = group.querySelector('.date');
        expect(date.innerText).toBe('5/2/2018');
      }));

      it('Should have correct elasped time', async(() => {
        const elapsedTime = group.querySelector('.elapsedTime');
        expect(elapsedTime.innerText).toBe('00:00:06');
      }));

      it('Should have correct number of history entries', async(() => {
        const historyEntries = group.querySelector('.history-entries');
        expect(historyEntries.children.length).toBe(2);
      }));
    });
  });
});

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-wrapper',
  template: `
    <app-tracker-history [loading]="loading"
                         [groups]="groups"></app-tracker-history>
  `
})
class TestWrapperComponent {
  loading = false;
  groups: HistoryGrouping[] = [];
}
