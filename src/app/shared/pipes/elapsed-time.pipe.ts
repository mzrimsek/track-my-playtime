import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {

  transform(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return this.getElapsedTime(start, end);
  }

  getElapsedTime(startDate: Date, currentTime: Date): string {
    if (this.isValidDate(startDate) && this.isValidDate(currentTime) && startDate.getTime() <= currentTime.getTime()) {
      const elapsedTime = currentTime.valueOf() - startDate.valueOf();
      return new Date(elapsedTime).toISOString().substring(11, 19);
    }
    return '00:00:00';
  }

  isValidDate(date: Date): boolean {
    return !isNaN(date.getTime()) && date.getTime() !== new Date(0).getTime();
  }
}
