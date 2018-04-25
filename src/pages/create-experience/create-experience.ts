import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MyExperiencesPage } from "../my-experiences/my-experiences";
import { TeacherProvider } from "../../providers/teacher/teacher";


@Component({
  selector: 'create-experience',
  templateUrl: 'create-experience.html'
})
export class CreateExperiencePage {

  createExperienceForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private teacherProvider: TeacherProvider,
              private alertCtrl: AlertController) {
    this.createExperienceForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6),]),
      date: new FormControl('', Validators.required),
    });
  }

  createExperience() {
    let experience = {
      name: this.createExperienceForm.value.name,
      description: this.createExperienceForm.value.description,
      date: this.createExperienceForm.value.date,
    };

    this.teacherProvider.addExperience(experience).then(data => {
      this.navCtrl.setRoot(MyExperiencesPage);
      this.experienceCreated();
    }).catch(err => {
      console.log(err);
    });
  }

  experienceCreated() {
    let alert = this.alertCtrl.create({
      message: 'Experiencia creada correctamente',
    });
    alert.present();
  }

}
