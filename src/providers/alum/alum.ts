
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

  editAlum(alum) {
    return this.api.get('student/edit', alum).then(data => {
      return data;
    });
  }

      offers() {
        return this.api.get('student/offer').then(data => {
          return data;
        });
      }

      apply(offer) {
        return this.api.get('student/offer/apply/' + offer.id).then(data => {
          return data;
        });
      }



  infoAlum() {
    return this.api.get('student/info').then(data => {
      return data;
    });
  }


}

