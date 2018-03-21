
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlumProvider {

  constructor(public api: ApiProvider) {
  }

  /*
  points() {
    return this.api.get('alum/points').then(data => {
      return data;
    });
  }
*/
  /*pasAlum() {
    return this.api.get('alum/info' ,alum).then(data => {
      return data;
    });
  }*/

  editAlum(alum) {
    return this.api.get('alum/edit/' ,alum).then(data => {
      return data;
    });
  }


  infoAlum() {
    return this.api.get('alum/info/').then(data => {
      return data;
    });
  }
}
  /*offers() {
    return this.api.get('alum/offers').then(data => {
      return data;
    });
  }*/
