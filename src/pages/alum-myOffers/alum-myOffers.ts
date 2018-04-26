import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { AlumProvider } from "../../providers/alum/alum";
import {HomePage} from "../home/home";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyOffersPage} from "../my-offers/my-offers";


@Component({
  selector: 'alum-myOffers',
  templateUrl: 'alum-myOffers.html'
})
export class AlumMyOffersPage {
  offer: any;
  offers: any;
  myOfferForm: FormGroup;
  showButton: boolean;
  current_date: String = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, private alumProvider: AlumProvider, public toastCtrl: ToastController, private formBuilder: FormBuilder) {
    this.alumProvider.myOffers().then(data => {
      this.offers = data;
      this.showButton = true;
    }).catch(err => {
      console.log('Not authorized');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser alumno para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
      this.showButton = false;
    });

    this.myOfferForm = this.formBuilder.group({
      appreciation: new FormControl('', [Validators.min(0)]),
      'validator': this.classTakenValidator
    });
  }

  classTakenValidator(control: FormGroup) {
    if (control.controls['end_date'].value < control.controls['current_date'].value)
      return {"cannot_valorate": true};
  }


    addAppreciation(offer_id, appreciation){

      this.alumProvider.addAppreciation(offer_id, appreciation).then(data => {
        this.navCtrl.setRoot(AlumMyOffersPage);
      }).catch(err => {
        console.log(err);
      });
    }



}
