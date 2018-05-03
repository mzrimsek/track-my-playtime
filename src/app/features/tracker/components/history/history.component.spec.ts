import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';

import { TimePipe } from '../../../../shared/pipes/time.pipe';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HistoryComponent,
        TimePipe,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('When data is loading', () => {
    beforeEach(async(() => {
      component.loading = true;
      fixture.detectChanges();
    }));

    // FIXME: Not sure why setting component to loading isn't working
    xit('Should show loading spinner', async(() => {
      const spinner = fixture.nativeElement.querySelector('app-shared-spinner');
      expect(spinner).toBeTruthy();
    }));
  });

  describe('When data is loaded', () => {
    it('Should not show loading spinner', async(() => {
      const spinner = fixture.nativeElement.querySelector('app-shared-spinner');
      expect(spinner).toBeNull();
    }));

    describe('When groups is empty', () => {
      it('Should show "no groups" element', () => {
        const noGroups = fixture.nativeElement.querySelector('.no-groups');
        expect(noGroups).toBeTruthy();
      });

      it('Should show "no groups" message', () => {
        const noGroups = fixture.nativeElement.querySelector('.no-groups');
        expect(noGroups.innerText).toBe('Nothing to show...get tracking!');
      });
    });

    describe('When groups has data', () => {
      beforeEach(async(() => {
        component.groups = [{
          key: '5/3/2018',
          historyItems: [{
            id: '1',
            game: 'some game',
            platform: 'some platform',
            startTime: 3000,
            endTime: 6000,
            dateRange: [new Date('5/3/2018'), new Date('5/3/2018')]
          }],
          totalTime: 3000
        }, {
          key: '5/2/2018',
          historyItems: [{
            id: '2',
            game: 'some game 2',
            platform: 'some platform',
            startTime: 30000,
            endTime: 60000,
            dateRange: [new Date('5/2/2018'), new Date('5/2/2018')]
          },
          {
            id: '3',
            game: 'some game 2',
            platform: 'some platform 2',
            startTime: 3000,
            endTime: 6000,
            dateRange: [new Date('5/2/2018'), new Date('5/2/2018')]
          }],
          totalTime: 33000
        }];
        fixture.detectChanges();
      }));

      it('Should show the correct number of groups', () => {

      });
    });
  });
});
