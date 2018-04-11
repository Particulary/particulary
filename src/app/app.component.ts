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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  aux: boolean = true;


  pages: Array<{ title: string, component: any, tabIndex?: number, icon?: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public events: Events, public menuCtrl: MenuController, public storage: Storage) {
    this.initializeApp();

    const alum_pages = [
      {title: 'Inicio', component: HomePage, icon: 'ios-home'},
      {title: 'Lista Ofertas (Alumno)', component: AllOffersPage, icon: 'ios-school'},
      {title: 'Editar alumno', component: EditAlumPage, icon: 'ios-brush'},
      { title: 'Mis mensajes (Alumno)', component: MyMessagesPageAlum, icon: 'md-chatboxes' },
      { title: 'Ofertas de alumno', component: AlumMyOffersPage, icon: 'ios-brush' },

      {title: 'Pago', component: StripePage, icon: 'ios-brush'},
    ];

    const teacher_pages = [
      {title: 'Inicio', component: HomePage, icon: 'ios-home'},
      {title: 'Mis Ofertas', component: MyOffersPage, icon: 'ios-school'},
      {title: 'Mis Experiencias', component: MyExperiencesPage, icon: 'md-ribbon'},
      {title: 'Editar profesor', component: EditTeacherPage, icon: 'md-color-palette'},
      { title: 'Mis mensajes (Profesor)', component: MyMessagesPageTeacher, icon: 'md-chatboxes' },

    ];

    this.storage.get('auth').then((val) => {
      if (val !== null) {
        if (val['rol'] === 'student') {
          this.pages = alum_pages;
        } else if (val['rol'] === 'teacher') {
          this.pages = teacher_pages;
        }
      }
    });

    events.subscribe('login:update', (rol) => {
      if (rol === 'student') {
        this.pages = alum_pages;
      } else if (rol === 'teacher') {
        this.pages = teacher_pages;
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
