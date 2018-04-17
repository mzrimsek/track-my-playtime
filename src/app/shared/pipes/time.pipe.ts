import { Pipe, PipeTransform } from '@angular/core';

import { formatTime } from '../../shared/utils/date.utils';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {

  transform(timeInSeconds: number): string {
    return formatTime(timeInSeconds);
  }
}
