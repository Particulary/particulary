import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

import {
  NavController, ToastController, Modal, ModalController, ModalOptions, Events,
  MenuController
} from 'ionic-angular';

import {LoginProvider} from "../../providers/login/login";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  emailError: boolean = false;
  show: boolean = false;

  constructor(public navCtrl: NavController, private loginProvider: LoginProvider, private storage: Storage, private formBuilder: FormBuilder, private toastCtrl: ToastController, public events: Events, private modal: ModalController, public menu: MenuController) {


    // TODO: Already logged -> Redirect to main page
    this.storage.get('credentials').then((val) => {
      if (val !== null) {
        // this.navCtrl.setRoot(TabsPage, { tabIndex: 0 }, { animate: true, direction: 'forward' });
      }
    });

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      session: new FormControl(false),
    });

  }

  login() {
    let user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginProvider.login(user).then(data => {

      console.log(data);

      this.menu.enable(true, 'leftMenu');
      // TODO: save api_token and check if session must be saved
      this.storage.set('api_token', data['api_token']);

      // TODO: Login susccesfully -> Redirect to main page
      this.navCtrl.setRoot(HomePage, { tabIndex: 0 }, { animate: true, direction: 'forward' });

    }).catch(err => {

      console.log(err);
      //TODO: retrieve the error
        this.toastCtrl.create({
          message: err.error.login,
          duration: 3000,
          position: 'bottom'
        }).present();
      });

  }

  register() {

    // TODO: redirect to register page
    // this.navCtrl.push(CheckBeneficiaryPage, {}, {animate: true, direction: 'forward'});
  }

  validateEmail() {
    if (this.loginForm.controls['email'].errors && this.loginForm.value.email) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  togglePassword() {
    this.show = !this.show;
  }

}
