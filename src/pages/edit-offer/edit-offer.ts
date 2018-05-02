import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyOffersPage} from "../my-offers/my-offers";
import {TeacherProvider} from "../../providers/teacher/teacher";


@Component({
  selector: 'edit-offer',
  templateUrl: 'edit-offer.html'
})

export class EditOfferPage {

  offer: any;
  editOfferForm: FormGroup;
  tags: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider) {
    this.offer = navParams.data;

    this.tags = this.offer.tags.map(tag => {
      return tag.name;
    });

    this.editOfferForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      location: new FormControl('', [Validators.required, Validators.minLength(6)]),
      status: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0.00)]),
      max_hours: new FormControl('', [Validators.required, Validators.min(0.00)]),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', [Validators.required]),
      tags: new FormControl('')
    }, { 'validator': this.pastDateValidator });
  }

  pastDateValidator(control: FormGroup) {
    if (control.controls['end_date'].value < control.controls['start_date'].value)
      return {"invalid_end_date": true};
  }

  editOffer() {
    let offer = {
      name: this.editOfferForm.value.name,
      location: this.editOfferForm.value.location,
      status: this.editOfferForm.value.status,
      price: this.editOfferForm.value.price,
      max_hours: this.editOfferForm.value.max_hours,
      start_date: this.editOfferForm.value.start_date,
      end_date: this.editOfferForm.value.end_date,
      tags: this.editOfferForm.value.tags
    };

    this.teacherProvider.editOffer(offer, this.offer.id).then(data => {
      this.navCtrl.setRoot(MyOffersPage);
    }).catch(err => {
      console.log(err);
    });
  }
}
