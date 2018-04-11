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
  rate: number;
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


  }



}
