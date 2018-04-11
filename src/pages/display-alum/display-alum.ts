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
  rate: any;
  star: any;
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

    this.teacherProvider.alumRatingId(this.navParams.get('id')).then(data => {
      this.rate = data;
      switch (true){

        case (this.rate <= 0.7):
          this.star = 1;
          break;

        case (this.rate > 0.7 && this.rate <= 1.2):
          this.star = 2;
          break;

        case (this.rate > 1.2 && this.rate <= 1.7):
          this.star = 3;
          break;

        case (this.rate > 1.7 && this.rate <= 2.2):
          this.star = 4;
          break;

        case (this.rate > 2.2 && this.rate <= 2.7):
          this.star = 5;
          break;

        case (this.rate > 2.7 && this.rate <= 3.2):
          this.star = 6;
          break;

        case (this.rate > 3.2 && this.rate <= 3.7):
          this.star = 7;
          break;

        case (this.rate > 3.7 && this.rate <= 4.2):
          this.star = 8;
          break;

        case (this.rate > 4.2 && this.rate <= 4.7):
          this.star = 9;
          break;

        case (this.rate > 4.7):
          this.star = 10;
          break;

      }
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
