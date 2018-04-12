import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, Events, MenuController, NavController, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';

import {CreateExperiencePage} from "../pages/create-experience/create-experience";
import {MyOffersPage} from "../pages/my-offers/my-offers";

import {EditTeacherPage} from "../pages/edit-teacher/edit-teacher";

import {MyExperiencesPage} from "../pages/my-experiences/my-experiences";

import {HomePage} from "../pages/home/home";
import {EditAlumPage} from "../pages/edit-alum/edit-alum";
import {AllOffersPage} from "../pages/all-offers/all-offers";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../pages/login/login";
import {MyMessagesPageTeacher} from "../pages/my-messages/my-messages";
import {MyMessagesPageAlum} from "../pages/my-messages/my-messages";
import {RegisterPage} from "../pages/register/register";
import {AlumMyOffersPage} from "../pages/alum-myOffers/alum-myOffers";
import {CreateMessagePageTeacher} from "../pages/create-message/create-message";
import {DisplayAlumPage} from "../pages/display-alum/display-alum";
import {DisplayTeacherPage} from "../pages/display-teacher/display-teacher";
import {StripePage} from "../pages/stripe/stripe";
import {TeacherMyOffersPage} from "../pages/teacher-myOffers/teacher-myOffers";
import {AlumProvider} from "../providers/alum/alum";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  aux: boolean = true;
  points = 0;

  pages: Array<{ title: string, component: any, tabIndex?: number, icon?: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public events: Events, public menuCtrl: MenuController, public storage: Storage,
              public alumProvider: AlumProvider) {
    this.initializeApp();

    const alum_pages = [
      {title: 'Inicio', component: HomePage, icon: 'ios-home'},
      {title: 'Buscar clases', component: AllOffersPage, icon: 'ios-search'},
      {title: 'Mis clases', component: AlumMyOffersPage, icon: 'ios-school' },
      {title: 'Mensajes', component: MyMessagesPageAlum, icon: 'md-chatbubbles' },
      {title: 'Editar perfil', component: EditAlumPage, icon: 'md-color-palette'},
    ];

    const teacher_pages = [
      {title: 'Inicio', component: HomePage, icon: 'ios-home'},
      {title: 'Clases', component: MyOffersPage, icon: 'ios-school'},
      {title: 'Mensajes', component: MyMessagesPageTeacher, icon: 'md-chatbubbles' },
      {title: 'Editar perfil', component: EditTeacherPage, icon: 'md-color-palette'},
      {title: 'Experiencias', component: MyExperiencesPage, icon: 'md-ribbon'},
    ];

    this.storage.get('auth').then((val) => {
      if (val !== null) {
        if (val['rol'] === 'student') {
          this.pages = alum_pages;
          this.alumProvider.infoAlum().then(data => {
            this.points = data['particulary_points'];
          });

        } else if (val['rol'] === 'teacher') {
          this.pages = teacher_pages;
          this.points = 0;
        }
      }
    });

    events.subscribe('login:update', (rol) => {
      if (rol === 'student') {
        this.pages = alum_pages;
        this.alumProvider.infoAlum().then(data => {
          this.points = data['particulary_points'];
        });
      } else if (rol === 'teacher') {
        this.pages = teacher_pages;
        this.points = 0;
      }
    });

    events.subscribe('points:update', (points) => {
      if (points !== null) {
        this.points = points;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.menuCtrl.enable(false, 'leftMenu');
      this.statusBar.styleDefault();
    });
  }

  goToPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.clear().then(() => {
      this.menuCtrl.enable(false, 'leftMenu');
      this.nav.setRoot(LoginPage);
    });
  }
}
