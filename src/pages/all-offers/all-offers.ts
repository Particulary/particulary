import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AlumProvider} from "../../providers/alum/alum";
import {HomePage} from "../home/home";


@Component({
  selector: 'all-offers',
  templateUrl: 'all-offers.html'
})
export class AllOffersPage {

  offers: any;
  searchInput: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alumProvider: AlumProvider, public toastCtrl: ToastController,) {
    this.alumProvider.offers('').then(data => {
      this.offers = data;
    }).catch(err => {
      console.log('Not authorized');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser alumno para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
    });
  }

  applyOffer(offer) {
    this.alumProvider.apply(offer).then(data => {
      this.toastCtrl.create({
        message: 'Apply correctly',
        duration: 3000,
        position: 'bottom'
      }).present();
    }).catch(err => {
      this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'bottom'
      }).present();
    });
  }

  reloadOffers(e) {
    this.alumProvider.offers(e.target.value).then(data => {
      this.offers = data;
    }).catch(err => {
      console.log('Not authorized');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser alumno para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
    });
  }

}
