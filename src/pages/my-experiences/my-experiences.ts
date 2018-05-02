import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import { TeacherProvider } from "../../providers/teacher/teacher";
import { CreateExperiencePage } from "../create-experience/create-experience";
import {EditExperiencePage} from "../edit-experience/edit-experience";
import {HomePage} from "../home/home";


@Component({
  selector: 'my-experiences',
  templateUrl: 'my-experiences.html'
})
export class MyExperiencesPage {

  experiences: any;
showButton: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private teacherProvider: TeacherProvider,  public toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    this.teacherProvider.myExperiences().then(data => {
      this.experiences = data;
      this.showButton=true;
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
      this.experienceDeleted();
    }).catch(err => {
      console.log('ERROR: ' + err);
    });
  }

  experienceDeleted() {
    let alert = this.alertCtrl.create({
      message: 'Eliminado  correctamente',
    });
    alert.present();
  }

}
