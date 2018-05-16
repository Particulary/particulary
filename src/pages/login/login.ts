import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

import {
  NavController, ToastController, Modal, ModalController, ModalOptions, Events,
  MenuController
} from 'ionic-angular';

import {LoginProvider} from "../../providers/login/login";
import {HomePage} from "../home/home";
import {RegisterPage} from "../../pages/register/register";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  emailError: boolean = false;
  show: boolean = false;

  constructor(public navCtrl: NavController, private loginProvider: LoginProvider,
              private storage: Storage, private formBuilder: FormBuilder,
              private toastCtrl: ToastController, public events: Events, private modal: ModalController,
              public menu: MenuController) {


    // TODO: Already logged -> Redirect to main page
    this.storage.get('auth').then((val) => {
      if (val !== null) {
        this.menu.enable(true, 'leftMenu');
        this.navCtrl.setRoot(HomePage);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      session: new FormControl(false),
      type: new FormControl('')
    });

  }

  login() {
    let user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      type: this.loginForm.value.type
    };

    this.loginProvider.login(user).then(data => {

      // TODO: save api_token and check if session must be saved
      this.storage.set('auth', data).then(() => {

        this.events.publish('token:update', data['api_token']);
        this.events.publish('login:update', data);

        // TODO: Login susccesfully -> Redirect to main page
        this.menu.enable(true, 'leftMenu');
        this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
      });

    }).catch(err => {
      console.log(err.error);
      this.toastCtrl.create({
        message: err.error,
        duration: 3000,
        position: 'bottom'
      }).present({});
    });

  }

  register() {
    this.navCtrl.push(RegisterPage, {}, {animate: true, direction: 'forward'});
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

  forgotPassword() {
    this.loginProvider.forgotPassword(this.loginForm.value.email, this.loginForm.value.type).then(data => {

    }).catch(err => {
      console.log(err);
    })
  }

}
