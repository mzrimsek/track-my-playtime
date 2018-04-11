import { Pipe, PipeTransform } from '@angular/core';

import { formatTime, getElapsedTimeInSeconds } from '../../shared/utils/date.utils';

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {

  transform(startTime: number, endTime: number): string {
    const elapsedTime = getElapsedTimeInSeconds(startTime, endTime);
    return elapsedTime >= 0 && this.canCalculate(startTime, endTime) ? formatTime(elapsedTime) : '00:00:00';
  }

  canCalculate(startTime: number, endTime: number): boolean {
    const areValid = startTime !== 0 && endTime !== 0;
    const areInOrder = startTime <= endTime;
    return areValid && areInOrder;
  }
}
