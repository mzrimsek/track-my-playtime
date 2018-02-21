import { Pipe, PipeTransform } from '@angular/core';
import { getElapsedTime } from '../../utils/dateHelper';

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {

  transform(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return getElapsedTime(start, end);
  }

}
