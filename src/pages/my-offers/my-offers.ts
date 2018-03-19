import { Component } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import { TeacherProvider } from "../../providers/teacher/teacher";
import { CreateOfferPage } from "../create-offer/create-offer";
import {EditOfferPage} from "../edit-offer/edit-offer";


@Component({
  selector: 'my-offers',
  templateUrl: 'my-offers.html'
})
export class MyOffersPage {

  offers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider) {
    this.teacherProvider.myOffers().then(data => {
      this.offers = data;
    });
  }

  addOffer() {
    this.navCtrl.push(CreateOfferPage);
  }

  editOffer(offer) {
    this.navCtrl.push(EditOfferPage, offer);
  }

  deleteOffer(offer) {
    this.teacherProvider.deleteOffer(offer.id).then(data => {
      var i = this.offers.indexOf(offer);
      console.log(this.offers);
      console.log(i);
      if(i != -1) {
        this.offers.splice(i, 1);
      }
    }).catch(err => {
      console.log('ERROR: ' + err);
    });
  }
}
