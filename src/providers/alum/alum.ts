import {Injectable} from '@angular/core';
import {ApiProvider} from '../api/api';

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
    return this.api.post('student/edit', alum).then(data => {
      return data;
    });
  }

  offers(search) {
    return this.api.get('student/offer', {name: search}).then(data => {
      return data;
    });
  }

  myOffers() {
    return this.api.get('student/myOffer').then(data => {
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

  addAppreciation(offer_id, appreciation) {
    return this.api.post('student/offer/' + offer_id +'/appreciation', {appreciation: appreciation}).then(data => {
      return data;
    });
    }

  infoAlumId(id) {
    return this.api.get('student/teacherInfo', {id:id}).then(data => {
      return data;
    });
  }

  alumMessages() {
    return this.api.get('student/message').then(data => {
      return data;
    });
  }

  teacherRatingId(id) {
    return this.api.get('teacher/teacherRating',{id:id}).then(data => {
      return data;
    });
  }

  addMessageAlum(message) {
    return this.api.post('student/message', message).then(data => {
      return data;
    });
  }

}

