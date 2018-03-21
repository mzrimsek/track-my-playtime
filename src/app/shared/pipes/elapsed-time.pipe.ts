import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {

  transform(startTime: number, endTime: number): string {
    const elapsedTime = endTime - startTime;
    return elapsedTime >= 0 && this.canCalculate(startTime, endTime) ? this.formatElapsedTime(elapsedTime) : '00:00:00';
  }

  canCalculate(startTime: number, endTime: number): boolean {
    const areValid = startTime !== 0 && endTime !== 0;
    const areInOrder = startTime <= endTime;
    return areValid && areInOrder;
  }

  formatElapsedTime(elapsedTime: number): string {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime - (hours * 3600)) / 60);
    const seconds = elapsedTime - (hours * 3600) - (minutes * 60);

    return this.getZeroPaddingTime(hours) + ':' + this.getZeroPaddingTime(minutes) + ':' + this.getZeroPaddingTime(seconds);
  }

  getZeroPaddingTime(time: number): string {
    return time < 10 ? '0' + time : '' + time;
  }
}
