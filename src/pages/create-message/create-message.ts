import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MyMessagesPageAlum } from "../my-messages/my-messages";
import { MyMessagesPageTeacher} from "../my-messages/my-messages";
import { TeacherProvider } from "../../providers/teacher/teacher";
import {AlumProvider} from "../../providers/alum/alum";


@Component({
  selector: 'create-message',
  templateUrl: 'create-message.html'
})
export class CreateMessagePageTeacher {

  createMessageForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider,
              private alertCtrl: AlertController) {
    this.createMessageForm = this.formBuilder.group({
      text: new FormControl('', [Validators.required, Validators.minLength(1),]),
    });
  }

  createMessage() {
    console.log(this.navParams);
    let message = {

      text: this.createMessageForm.value.text,
      alum_id: this.navParams.get("message"),
    };

    this.teacherProvider.addMessage(message).then(data => {
      this.navCtrl.setRoot(MyMessagesPageTeacher);
      this.messageCreated();
    }).catch(err => {
      console.log(err);
    });
  }

  messageCreated() {
    let alert = this.alertCtrl.create({
      message: 'Mensaje enviado correctamente',
    });
    alert.present();
  }

}

@Component({
  selector: 'create-message',
  templateUrl: 'create-message.html'
})
export class CreateMessagePageAlum {

  createMessageForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private alumProvider: AlumProvider,
              private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.createMessageForm = this.formBuilder.group({
      text: new FormControl('', [Validators.required, Validators.minLength(1),]),
    });
  }

 createMessage() {
    console.log(this.navParams);
    let message = {

      text: this.createMessageForm.value.text,
      teacher_id: this.navParams.get("message"),
    };

    this.alumProvider.addMessageAlum(message).then(data => {
      this.navCtrl.setRoot(MyMessagesPageAlum);
      this.messageCreated();
    }).catch(err => {
      console.log(err);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });
  }

  messageCreated() {
    let alert = this.alertCtrl.create({
      message: 'Mensaje enviado correctamente',
    });
    alert.present();
  }

  }
