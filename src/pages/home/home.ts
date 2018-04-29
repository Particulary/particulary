import { Component } from '@angular/core';
import {Events, NavController, NavParams, ToastController} from 'ionic-angular';
import {CreateOfferPage} from "../create-offer/create-offer";
import {CreateExperiencePage} from "../create-experience/create-experience";
import {AllOffersPage} from "../all-offers/all-offers";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  aux: boolean ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController) {
    this.storage.get('auth').then((val) => {
      if (val !== null) {
        if (val['rol'] === 'student') {
          this.aux = true;

        } else if (val['rol'] === 'teacher') {
          this.aux = false;
        }
      } else {
        this.aux = true;
      }
    });
  }

  addOffer() {
    this.navCtrl.push(CreateOfferPage);
  }

  addExperience() {
    this.navCtrl.push(CreateExperiencePage);
  }

  searchOffers() {
    this.navCtrl.push(AllOffersPage);
  }

  loadMore() {}

  loginAsTeacher() {

  }

  loginAsTeacherAux() {

  }

  loginAsAlum() {

  }
}
