import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class ClockService {

  private clock$: Observable<Date>;
  constructor() {
    this.clock$ = Observable.interval(1000).map(tick => new Date()).share();
  }

  getClock(): Observable<Date> {
    return this.clock$;
  }
}
