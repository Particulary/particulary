import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider) {
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
    }).catch(err => {
      console.log(err);
    });
  }

}

@Component({
  selector: 'create-message',
  templateUrl: 'create-message.html'
})
export class CreateMessagePageAlum {

  createMessageForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private alumProvider: AlumProvider) {
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
    }).catch(err => {
      console.log(err);
    });
  }

}
