import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeacherProvider } from "../../providers/teacher/teacher";
import { CreateOfferPage } from "../create-offer/create-offer";
import { EditOfferPage } from "../edit-offer/edit-offer";


@Component({
  selector: 'my-offers',
  templateUrl: 'my-offers.html'
})
export class MyOffersPage {

  offers: any;
showButton: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider) {
    this.teacherProvider.myOffers().then(data => {
      this.offers = data;
      this.showButton=true;
    }).catch(err => {
      console.log('Not authorized');
      this.showButton= false;
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
      if(i != -1) {
        this.offers.splice(i, 1);
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
