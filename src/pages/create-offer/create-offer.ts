import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MyOffersPage } from "../my-offers/my-offers";
import { TeacherProvider } from "../../providers/teacher/teacher";


@Component({
  selector: 'create-offer',
  templateUrl: 'create-offer.html'
})
export class CreateOfferPage {

  createOfferForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider,
              private alertCtrl: AlertController) {
    this.createOfferForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      location: new FormControl('', [Validators.required, Validators.minLength(6)]),
      price: new FormControl('', [Validators.required, Validators.min(0.00)]),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    });
  }

  createOffer() {
    let offer = {
      name: this.createOfferForm.value.name,
      location: this.createOfferForm.value.location,
      price: this.createOfferForm.value.price,
      start_date: this.createOfferForm.value.start_date,
      end_date: this.createOfferForm.value.end_date,
    };

    this.teacherProvider.addOffer(offer).then(data => {
      this.navCtrl.setRoot(MyOffersPage);
      this.offerCreated();
    }).catch(err => {
      console.log(err);
    });
  }

  offerCreated() {
    let alert = this.alertCtrl.create({
      message: 'Clase creada correctamente',
    });
    alert.present();
  }

}
