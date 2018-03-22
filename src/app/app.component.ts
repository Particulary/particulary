import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events, MenuController, NavController, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import {CreateExperiencePage} from "../pages/create-experience/create-experience";
import {MyOffersPage} from "../pages/my-offers/my-offers";
import {MyExperiencesPage} from "../pages/my-experiences/my-experiences";

import {HomePage} from "../pages/home/home";
import {AllOffersPage} from "../pages/all-offers/all-offers";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../pages/login/login";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;


  pages: Array<{ title: string, component: any, tabIndex?: number, icon?: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public events: Events, public menuCtrl: MenuController, public storage: Storage,  public toastCtrl: ToastController) {
    this.initializeApp();

    this.pages = [
      { title: 'Inicio', component: HomePage, icon: 'ios-home' },
      { title: 'Mis Ofertas', component: MyOffersPage, icon: 'md-ribbon' },
      { title: 'Mis Experiencias', component: MyExperiencesPage, icon: 'ios-school' },
      { title: 'Lista Ofertas (Alumno)', component: AllOffersPage, icon: 'md-ribbon' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  goToPage(page) {
    this.nav.setRoot(page.component);
  }

  loginAsTeacher() {
    this.events.publish('token:update', 'iRV5XSbrgcttVViF18NHFaS0fDMnU13SsXBHNkGaTZtuUREnMI0sSy0sJJ6y');
    this.toastCtrl.create({
      message: 'Estás logueado como profesor',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  loginAsAlum() {
    this.events.publish('token:update', 'aRV5XSbrgcttVViF18NHFaS0fDMnU13SsXBHNkGaTZtuUREnMI0sSy0sJJ6y');
    this.toastCtrl.create({
      message: 'Estás logueado como alumno',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

}
