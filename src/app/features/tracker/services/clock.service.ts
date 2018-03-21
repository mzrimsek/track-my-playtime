import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { getUnixTimestampForDate } from '../../../shared/helpers/dateHelper';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class ClockService {

  private currentTime$: Observable<number>;
  constructor() {
    this.currentTime$ = Observable.interval(1000).map(() => getUnixTimestampForDate(new Date())).share();
  }

  getCurrentTime(): Observable<number> {
    return this.currentTime$;
  }
}
