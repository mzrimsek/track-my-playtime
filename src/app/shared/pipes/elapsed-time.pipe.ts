import { Pipe, PipeTransform } from '@angular/core';

import { formatTime, getElapsedTimeInSeconds } from '../../shared/utils/date.utils';

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {

  transform(startTimeInMS: number, endTimeInMS: number): string {
    const elapsedTime = getElapsedTimeInSeconds(startTimeInMS, endTimeInMS);
    return elapsedTime >= 0 && this.canCalculate(startTimeInMS, endTimeInMS) ? formatTime(elapsedTime) : '00:00:00';
  }

  canCalculate(startTime: number, endTime: number): boolean {
    const areValid = startTime !== 0 && endTime !== 0;
    const areInOrder = startTime <= endTime;
    return areValid && areInOrder;
  }
}
