import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from "../pages/login/login";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

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
      this.statusBar.styleDefault();
    });
  }
}
