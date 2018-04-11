import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { TeacherProvider } from "../../providers/teacher/teacher";
import { CreateOfferPage } from "../create-offer/create-offer";
import { EditOfferPage } from "../edit-offer/edit-offer";
import {HomePage} from "../home/home";
import {AlumProvider} from "../../providers/alum/alum";
import {CreateMessagePageAlum, CreateMessagePageTeacher} from "../create-message/create-message";


@Component({
  selector: 'my-messages',
  templateUrl: 'my-messages.html'
})
export class MyMessagesPageTeacher {

  messages: any;
  showButton: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider, public toastCtrl: ToastController) {
    this.teacherProvider.teacherMessages().then(data => {
      this.messages = data;
      this.showButton=true;
      console.log(data)
    }).catch(err => {
      console.log('Not authorized');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser profesor para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
      this.showButton= false;
    });

  }


      addMessageT(messageT) {
           this.navCtrl.push(CreateMessagePageTeacher, {message: messageT});

  }


}

@Component({
  selector: 'my-messages',
  templateUrl: 'my-messages.html'
})
export class MyMessagesPageAlum {

  messages: any;
  showButton: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alumProvider: AlumProvider, public toastCtrl: ToastController) {
    this.alumProvider.alumMessages().then(data => {
      this.messages = data;
      this.showButton=true;
    }).catch(err => {
      console.log('Not authorized');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser alumno para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
      this.showButton= false;
    });
  }

  addMessageA(messageA) {
    this.navCtrl.push(CreateMessagePageAlum, {message: messageA});

  }



}
