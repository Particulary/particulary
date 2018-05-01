import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider,  public toastCtrl: ToastController) {
    this.teacher=false;
    this.teacherProvider.infoTeacher().then(data => {
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


    this.editTeacherForm = this.formBuilder.group({
      //subject: new FormControl('', [Validators.required, Validators.minLength(3)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      phone: new FormControl('', [Validators.required,Validators.pattern('(\\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}')]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      bio: new FormControl('', [Validators.required, Validators.minLength(5)]),
      linkedin: new FormControl('', [Validators.required,Validators.pattern('https?://.+')]),
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
    let teacher = {
      name: this.editTeacherForm.value.name,
      surname: this.editTeacherForm.value.surname,
      email: this.editTeacherForm.value.email,
      phone: this.editTeacherForm.value.phone,
      address: this.editTeacherForm.value.address,
      bio: this.editTeacherForm.value.bio,
      linkedin: this.editTeacherForm.value.linkedin,
    };


    this.teacherProvider.editTeacher(teacher).then(data => {
      this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      console.log(err);
    });
  }



}
