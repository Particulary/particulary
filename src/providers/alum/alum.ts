import {Injectable} from '@angular/core';
import {ApiProvider} from '../api/api';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlumProvider {

  constructor(public api: ApiProvider, public http: HttpClient) {
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
    return this.api.get('student/offer/apply/' + offer.id, {hired_hours: offer.hired_hours}).then(data => {
      return data;
    });
  }


  infoAlum() {
    return this.api.get('student/info').then(data => {
      return data;
    });
  }

  updatePoints(points) {
    return this.api.post('student/updatePoints', {points: points}).then(data => {
      return data;
    });
  }
  addAppreciation(offer_id, appreciation) {
    return this.api.post('student/offer/' + offer_id +'/appreciation', {appreciation: appreciation}).then(data => {
      return data;
    });
    }

  getStripeToken(body) {
    let head = {
      'X-Mashape-Key': 'ffcw6wvO7Jmsh5EIn5KtJoImPYoVp1NCuXUjsnw52GWxSYArzp',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };

    return this.http.post('https://noodlio-pay.p.mashape.com/tokens/create', body, {"headers": head}).toPromise().then(data => {
      return data;
    });

  }

  payStripe(body) {
    let head = {
      'X-Mashape-Key': 'ffcw6wvO7Jmsh5EIn5KtJoImPYoVp1NCuXUjsnw52GWxSYArzp',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };

    return this.http.post('https://noodlio-pay.p.mashape.com/charge/token', body, {"headers": head}).toPromise().then(data => {
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
    return this.api.get('student/teacherRating/'+id).then(data => {
      return data;
    });
  }

  addMessageAlum(message) {
    return this.api.post('student/message', message).then(data => {
      return data;
    });
  }

}

