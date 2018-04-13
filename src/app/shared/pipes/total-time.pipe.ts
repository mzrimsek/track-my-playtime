import { Pipe, PipeTransform } from '@angular/core';

import { formatTime } from '../../shared/utils/date.utils';

@Pipe({ name: 'totalTime' })
export class TotalTimePipe implements PipeTransform {

  transform(totalTime: number): string {
    return formatTime(totalTime);
  }
}
