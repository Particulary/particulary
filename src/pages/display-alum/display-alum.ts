import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {TeacherProvider} from "../../providers/teacher/teacher";


@Component({
  selector: 'display-alum',
  templateUrl: 'display-alum.html',
})
export class DisplayAlumPage {

  alum: any;
  rate: number;
  emailError: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider,  public toastCtrl: ToastController) {
    this.alum = false;
    this.teacherProvider.infoTeacherId(this.navParams.get('id')).then(data => {
      this.alum = data;
      console.log(data);
    }).catch(err => {
      console.log('No autorizado');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser profesor para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
    });


  }



}
