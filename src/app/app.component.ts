import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {EditAlumPage} from "../pages/edit-alum/edit-alum";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = EditAlumPage;

  pages: Array<{ title: string, component: any, tabIndex?: number, icon?: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public events: Events, public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    this.pages = [
      { title: 'Ayuda', component: LoginPage, icon: 'help-buoy' },
    ];

  }

  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.menuCtrl.enable(false, 'leftMenu');

    });
  }
}
