import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherProvider} from "../../providers/teacher/teacher";
import {HomePage} from "../home/home";


@Component({
  selector: 'edit-teacher',
  templateUrl: 'edit-teacher.html',
})
export class EditTeacherPage {

  teacher: any;
  editTeacherForm: FormGroup;
  emailError: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider) {
    this.teacher=false;
    this.teacherProvider.infoTeacher().then(data => {
      this.teacher = data;
      console.log(data);
    });


    this.editTeacherForm = this.formBuilder.group({
      //subject: new FormControl('', [Validators.required, Validators.minLength(3)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,/* Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')*/]),
      phone: new FormControl('', [Validators.required,/*Validators.pattern('^(6|7|8|9)+d{9}')*/]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      bio: new FormControl('', [Validators.required, Validators.minLength(5)]),
      //appreciation: new FormControl('', [Validators.required, Validators.max(5)]),
    });
  }

  validateEmail() {
    if (this.editTeacherForm.controls['email'].errors && this.editTeacherForm.value.email) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  editTeacher() {
    //let teacher = this.teacher;

    this.teacherProvider.editTeacher(this.teacher).then(data => {
      this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      console.log(err);
    });
  }



}
