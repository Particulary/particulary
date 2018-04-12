import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AlumProvider} from "../../providers/alum/alum";
import {HomePage} from "../home/home";


@Component({
  selector: 'display-teacher',
  templateUrl: 'display-teacher.html',
})
export class DisplayTeacherPage {

  teacher: any;
  rate: any;
  star: any;
  emailError: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private alumProvider: AlumProvider,  public toastCtrl: ToastController) {
    this.teacher = false;
    this.alumProvider.infoAlumId(this.navParams.get('id')).then(data => {
      this.teacher = data;
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

    this.alumProvider.teacherRatingId(this.navParams.get('id')).then(data => {
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
