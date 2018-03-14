import {Pipe, PipeTransform, Injectable} from '@angular/core';

/**
 * Generated class for the DaysTillTodayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'daysTillToday',
})

@Injectable()
export class DaysTillTodayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {

    let today: any = new Date();
    let date: any = new Date(value.split(".")[0].replace(/-/g, "/"));
    let differenceDays: any = Math.floor((today - date) / (1000 * 3600 * 24));

    let result = "";

    if(differenceDays > 1) {
      if (differenceDays > 6) {
        let month = date.toLocaleString('es-es', { month: "short" });
        result = date.getDate() + " / " + month + " / " + date.getFullYear();
      } else {
        result = "Hace " + differenceDays + " días";
      }
    } else {
      if (differenceDays == 0) {
        result = 'Hoy';
      } else {
        result = "Ayer";
      }
    }

    return result;
  }
}
