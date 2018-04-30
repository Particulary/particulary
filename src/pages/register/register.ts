import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

import {
  NavController, ToastController, Modal, ModalController, ModalOptions, Events,
  MenuController, AlertController
} from 'ionic-angular';

import {LoginProvider} from "../../providers/login/login";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  emailError: boolean = false;
  show: boolean = false;

  constructor(public navCtrl: NavController, private loginProvider: LoginProvider,
              private storage: Storage, private formBuilder: FormBuilder,
              private toastCtrl: ToastController, public events: Events, private modal: ModalController,
              public menu: MenuController,private alertCtrl: AlertController) {


    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
      email: new FormControl('', [Validators.required,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      phone: new FormControl('', [Validators.required,Validators.pattern('(\\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}')]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      bio: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });

  }


  register() {

    // TODO: do the method
    let user = {
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      address: this.registerForm.value.address,
      password: this.registerForm.value.password,
      bio: this.registerForm.value.bio,
      type: this.registerForm.value.type,
    };
    this.loginProvider.register(user).then(data => {

      console.log(data);

      this.menu.enable(true, 'leftMenu');
      // TODO: save api_token and check if session must be saved
      this.storage.set('api_token', data['api_token']);


      // TODO: Login susccesfully -> Redirect to main page
      this.navCtrl.setRoot(LoginPage, { tabIndex: 0 }, { animate: true, direction: 'forward' });
      this.presentAlert();

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

  presentAlert() {
    let alert = this.alertCtrl.create({
      message: 'Registrado correctamente',
    });
    alert.present();
  }

  validateEmail() {
    if (this.registerForm.controls['email'].errors && this.registerForm.value.email) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  togglePassword() {
    this.show = !this.show;
  }

}
