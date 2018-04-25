import { Component} from "@angular/core";
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlumProvider} from "../../providers/alum/alum";
import {HomePage} from "../home/home";
//import {MyOffersPage} from "../my-offers/my-offers";

@Component({
  selector: 'edit-alum',
  templateUrl: 'edit-alum.html',
})
export class EditAlumPage {

  alum: any;
  editAlumForm: FormGroup;
  emailError: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private alumProvider: AlumProvider, public toastCtrl: ToastController) {
    this.alum=false;
    this.alumProvider.infoAlum().then(data => {
      this.alum = data;
      console.log(data);
    }).catch(err => {
      console.log('No autorizado');
      this.navCtrl.setRoot(HomePage);
      this.toastCtrl.create({
        message: 'No autorizado, debes ser alumno para acceder',
        duration: 3000,
        position: 'bottom'
      }).present();
    });

    this.editAlumForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
      email: new FormControl('', [Validators.required,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      phone: new FormControl('', [Validators.required,Validators.pattern('(\\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}')]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      bio: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  validateEmail() {
    if (this.editAlumForm.controls['email'].errors && this.editAlumForm.value.email) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  editAlum() {
    let alum = {
      //point: this.editAlumForm.value.point,
      name: this.editAlumForm.value.name,
      surname: this.editAlumForm.value.surname,
      email: this.editAlumForm.value.email,
      //password: this.editAlumForm.value.password,
      phone: this.editAlumForm.value.phone,
      address: this.editAlumForm.value.address,
      bio: this.editAlumForm.value.bio,

    };

    this.alumProvider.editAlum(alum).then(data => {
      this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      console.log(err);
    });
  }



}
