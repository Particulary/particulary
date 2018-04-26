import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { TeacherProvider } from "../../providers/teacher/teacher";
import { CreateOfferPage } from "../create-offer/create-offer";
import { EditOfferPage } from "../edit-offer/edit-offer";
import {HomePage} from "../home/home";
import {DisplayTeacherPage} from "../display-teacher/display-teacher";
import {DisplayAlumPage} from "../display-alum/display-alum";
import {AlumMyOffersPage} from "../alum-myOffers/alum-myOffers";


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
      console.log(this.offers)
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

  displayAlum(id) {
    this.navCtrl.push(DisplayAlumPage,{id:id});
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

  addAppreciation(offer, appreciation){
    offer.alumAppreciation=appreciation;
    offer.tags="";
    this.teacherProvider.editOffer(offer, offer.id).then(data => {
      this.navCtrl.setRoot(MyOffersPage);
    }).catch(err => {
      console.log(err);
    });
  }
}
