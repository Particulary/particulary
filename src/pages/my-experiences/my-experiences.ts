import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeacherProvider } from "../../providers/teacher/teacher";
import { CreateExperiencePage } from "../create-experience/create-experience";
import {EditExperiencePage} from "../edit-experience/edit-experience";


@Component({
  selector: 'my-experiences',
  templateUrl: 'my-experiences.html'
})
export class MyExperiencesPage {

  experiences: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider) {
    this.teacherProvider.myExperiences().then(data => {
      this.experiences = data;
    });
  }

  addExperience() {
    this.navCtrl.push(CreateExperiencePage);
  }

  editExperience(experience) {
    this.navCtrl.push(EditExperiencePage, experience);
  }

  deleteExperience(experience) {
    this.teacherProvider.deleteExperience(experience.id).then(data => {
     var i = this.experiences.indexOf(experience);
      if(i != -1) {
        this.experiences.splice(i, 1);
      }
    }).catch(err => {
      console.log('ERROR: ' + err);
    });
  }
}
