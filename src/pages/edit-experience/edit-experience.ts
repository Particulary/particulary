import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import {MyOffersPage} from "../my-offers/my-offers";
import {TeacherProvider} from "../../providers/teacher/teacher";
import {MyExperiencesPage} from "../my-experiences/my-experiences";


@Component({
  selector: 'edit-experience',
  templateUrl: 'edit-experience.html'
})

export class EditExperiencePage {

  experience: any;
  editExperienceForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider,
              private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.experience = navParams.data;
    this.editExperienceForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6)]),
      date: new FormControl('', Validators.required),
    });
  }

  editExperience() {
    let experience = {
      name: this.editExperienceForm.value.name,
      description: this.editExperienceForm.value.description,
      date: this.editExperienceForm.value.date,
    };

    this.teacherProvider.editExperience(experience, this.experience.id).then(data => {
      this.navCtrl.setRoot(MyExperiencesPage);
      this.experienceEdited();
    }).catch(err => {
      console.log(err);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });
  }

  experienceEdited() {
    let alert = this.alertCtrl.create({
      message: 'Experiencia editada correctamente',
    });
    alert.present();
  }

}
