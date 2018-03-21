import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events, MenuController, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from "../pages/login/login";
import {CreateExperiencePage} from "../pages/create-experience/create-experience";
import {MyOffersPage} from "../pages/my-offers/my-offers";
import {MyExperiencesPage} from "../pages/my-experiences/my-experiences";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CreateExperiencePage;

  pages: Array<{ title: string, component: any, tabIndex?: number, icon?: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public events: Events, public menuCtrl: MenuController) {
    this.initializeApp();

    this.pages = [
      { title: 'Ayuda', component: LoginPage, icon: 'help-buoy' },
      { title: 'Mis Ofertas', component: MyOffersPage, icon: 'help-buoy' },
      { title: 'Mis Experiencias', component: MyExperiencesPage, icon: 'help-buoy' },
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
}
