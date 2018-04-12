import { Component } from '@angular/core';
import {Events, NavController, NavParams, ToastController} from 'ionic-angular';
import {TeacherProvider} from "../../providers/teacher/teacher";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  aux: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public events: Events, private teacherProvider: TeacherProvider, public toastCtrl: ToastController) {
    this.loginAsTeacherAux();
  }

  loadMore() {}

  loginAsTeacher() {

  }

  loginAsTeacherAux() {

  }

  loginAsAlum() {

  }
}
