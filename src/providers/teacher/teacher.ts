
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

  myOffers() {
    return this.api.get('teacher/offer').then(data => {
      return data;
    });
  }

  addOffer(offer) {
    return this.api.get('teacher/offer/create', offer).then(data => {
      return data;
    });
  }

  editOffer(offer, offer_id) {
    return this.api.get('teacher/offer/edit/' + offer_id, offer).then(data => {
      return data;
    });
  }

  deleteOffer(offer_id) {
    return this.api.get('teacher/offer/delete/' + offer_id).then(data => {
      return data;
    });
  }

  addExperience(experience) {
    return this.api.post('teacher/experience', experience).then(data => {
      return data;
    });
  }

  editExperience(experience, experience_id) {
    return this.api.put('teacher/experience/' + experience_id, experience).then(data => {
      return data;
    });
  }
  deleteExperience(experience_id) {
    return this.api.delete('teacher/experience/' + experience_id).then(data => {
      return data;
    });
  }
  myExperiences() {
    return this.api.get('teacher/experience').then(data => {
      return data;
    });
  }

}
