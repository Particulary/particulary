import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events, MenuController, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import {CreateExperiencePage} from "../pages/create-experience/create-experience";
import {MyOffersPage} from "../pages/my-offers/my-offers";
import {MyExperiencesPage} from "../pages/my-experiences/my-experiences";
import {AllOffersPage} from "../pages/all-offers/all-offers";
import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
<<<<<<< HEAD

  rootPage: any = HomePage;
=======
  
  rootPage: any = MyOffersPage;
>>>>>>> development


  pages: Array<{ title: string, component: any, tabIndex?: number, icon?: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public events: Events, public menuCtrl: MenuController, public storage: Storage) {
    this.initializeApp();

    this.pages = [
      { title: 'Mis Ofertas', component: MyOffersPage, icon: 'help-buoy' },
      { title: 'Mis Experiencias', component: MyExperiencesPage, icon: 'help-buoy' },
      { title: 'List Ofertas (Alumno)', component: AllOffersPage, icon: 'help-buoy' },
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
  }

  loginAsAlum() {
    this.events.publish('token:update', 'aRV5XSbrgcttVViF18NHFaS0fDMnU13SsXBHNkGaTZtuUREnMI0sSy0sJJ6y');
  }

}
