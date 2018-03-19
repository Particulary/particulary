import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TeacherProvider} from "../../providers/teacher/teacher";


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
}
