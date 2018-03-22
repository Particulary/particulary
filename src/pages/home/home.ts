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
    this.events.publish('token:update', 'iRV5XSbrgcttVViF18NHFaS0fDMnU13SsXBHNkGaTZtuUREnMI0sSy0sJJ6y');
    this.toastCtrl.create({
      message: 'Estás logueado como profesor',
      duration: 3000,
      position: 'bottom'
    }).present();
    this.aux=true;
  }

  loginAsTeacherAux() {
    this.events.publish('token:update', 'iRV5XSbrgcttVViF18NHFaS0fDMnU13SsXBHNkGaTZtuUREnMI0sSy0sJJ6y');
    this.aux=true;
  }

  loginAsAlum() {
    this.events.publish('token:update',  'aRV5XSbrgcttVViF18NHFaS0fDMnU13SsXBHNkGaTZtuUREnMI0sSy0sJJ6y');
    this.toastCtrl.create({
      message: 'Estás logueado como alumno',
      duration: 3000,
      position: 'bottom'
    }).present();
    this.aux=false;
  }
}
