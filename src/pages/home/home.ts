import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TeacherProvider} from "../../providers/teacher/teacher";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  offers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider) {
    this.teacherProvider.offers().then(data => {
      this.offers = data;
      console.log(data);
    });
  }

  loadMore() {}

}
