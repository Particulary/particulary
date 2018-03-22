import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { TeacherProvider } from "../../providers/teacher/teacher";
import { CreateOfferPage } from "../create-offer/create-offer";
import { EditOfferPage } from "../edit-offer/edit-offer";
import {HomePage} from "../home/home";


@Component({
  selector: 'my-offers',
  templateUrl: 'my-offers.html'
})
export class MyOffersPage {

  offers: any;
showButton: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider, public toastCtrl: ToastController) {
    this.teacherProvider.myOffers().then(data => {
      this.offers = data;
      this.showButton=true;
    }).catch(err => {
      console.log('Not authorized');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser profesor para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
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
