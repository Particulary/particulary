import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TeacherProvider} from "../../providers/teacher/teacher";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  experiences: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider) {
    this.teacherProvider.experiences().then(data => {
      this.experiences = data;
    });
  }

  loadMore() {}

}
