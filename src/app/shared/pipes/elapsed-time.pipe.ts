import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {

  transform(startTime: string, endTime: string): string {
    const start = moment(startTime);
    const end = moment(endTime);
    return this.getElapsedTime(start, end);
  }

  getElapsedTime(startDate: moment.Moment, endDate: moment.Moment): string {
    if (this.canCalculate(startDate, endDate)) {
      const elapsedTime = endDate.diff(startDate);
      return moment(elapsedTime).toISOString().substring(11, 19);
    }
    return '00:00:00';
  }

  canCalculate(startDate: moment.Moment, endDate: moment.Moment): boolean {
    const areValid = startDate.isValid() && endDate.isValid();
    const areInOrder = startDate.isBefore(endDate);
    return areValid && areInOrder;
  }
}
