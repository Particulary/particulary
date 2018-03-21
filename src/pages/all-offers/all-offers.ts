import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AlumProvider} from "../../providers/alum/alum";


@Component({
  selector: 'all-offers',
  templateUrl: 'all-offers.html'
})
export class AllOffersPage {

  offers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alumProvider: AlumProvider, public toastCtrl: ToastController) {
    this.alumProvider.offers().then(data => {
      this.offers = data;
    }).catch(err => {
      console.log('Not authorized');
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

}