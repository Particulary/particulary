
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeacherProvider {

  constructor(public api: ApiProvider) {
  }

  offers() {
    return this.api.get('teacher/offers').then(data => {
      return data;
    });
  }

  experiences() {
    return this.api.get('teacher/experience').then(data => {
      return data;
    });
  }

}
