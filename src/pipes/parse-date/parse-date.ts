import {Pipe, PipeTransform, Injectable} from '@angular/core';

/**
 * Generated class for the DaysTillTodayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'parseDate',
})

@Injectable()
export class ParseDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let date: any = new Date(value.split(".")[0].replace(/-/g, "/"));
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
}
