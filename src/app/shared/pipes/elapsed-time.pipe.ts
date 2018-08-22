import { Pipe, PipeTransform } from '@angular/core';

import { formatElapsedTime } from '../../shared/utils/date.utils';

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {

  transform(startTimeInMS: number, endTimeInMS: number): string {
    return formatElapsedTime(startTimeInMS, endTimeInMS);
  }
}
