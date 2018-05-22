import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pluralize' })
export class PluralizePipe implements PipeTransform {
  transform(value: number, singlularWord: string, pluralWord: string): string {
    if (value === 1) {
      return singlularWord;
    }
    return pluralWord;
  }
}
