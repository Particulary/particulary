import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherProvider} from "../../providers/teacher/teacher";
import {HomePage} from "../home/home";
import {MyOffersPage} from "../my-offers/my-offers";


@Component({
  selector: 'edit-teacher',
  templateUrl: 'edit-teacher.html',
})
export class EditTeacherPage {

  teacher: any;
  editTeacherForm: FormGroup;
  emailError: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider) {
    this.teacher = navParams.data;

    this.editTeacherForm = this.formBuilder.group({
      //subject: new FormControl('', [Validators.required, Validators.minLength(3)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,/* Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')*/]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
    let teacher = {
      //subject: this.editTeacherForm.value.subject,
      name: this.editTeacherForm.value.name,
      surname: this.editTeacherForm.value.surname,
      email: this.editTeacherForm.value.email,
      password: this.editTeacherForm.value.password,
      phone: this.editTeacherForm.value.phone,
      address: this.editTeacherForm.value.address,
      bio: this.editTeacherForm.value.bio,

    };

    this.teacherProvider.editTeacher(teacher).then(data => {
      this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      console.log(err);
    });
  }



}
