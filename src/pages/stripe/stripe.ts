import {Component} from '@angular/core';
import {Events, NavController, NavParams, ToastController} from 'ionic-angular';
import {Stripe} from '@ionic-native/stripe';
import {AlumProvider} from "../../providers/alum/alum";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";

@Component({
  selector: 'stripe',
  templateUrl: 'stripe.html'
})
export class StripePage {

  stripe_token;
  createPaymentForm: FormGroup;
  amount = 1000;
  points = 0;
  offer;
  hired_hours = 1;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams,
              private stripe: Stripe, private alumProvider: AlumProvider, private formBuilder: FormBuilder,
              private events: Events) {
    this.offer = this.navParams.get('offer');


    this.stripe.setPublishableKey('pk_live_EuJKkK58l167vDf6BLCQ3zyG');

    console.log(this.offer);

    this.createPaymentForm = this.formBuilder.group({
      hired_hours: new FormControl('', [Validators.required, Validators.min(0.00), Validators.max(this.offer.max_hours)]),
      cvc: new FormControl('', [Validators.required, Validators.pattern('^\\d{3}$')]),
      exp_month: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern('(0[1-9]|1[012])')]),
      exp_year: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('([0-9]{4})')]),
      number: new FormControl('', [Validators.required, Validators.pattern('^\\d{16}$')]),
      discount: new FormControl(''),
    });

    // Get my info: points
    this.alumProvider.infoAlum().then(data => {
      this.points = data['particulary_points'] == null ? 0 : data['particulary_points'];
    });
  }

  createPayment() {
    let pay = {
      cvc: this.createPaymentForm.value.cvc,
      exp_month: this.createPaymentForm.value.exp_month,
      exp_year: this.createPaymentForm.value.exp_year,
      number: this.createPaymentForm.value.number,
      discount: this.createPaymentForm.value.discount,
    };

    var next_points;
    if (pay.discount) {
      next_points = this.points - pay.discount;
      this.amount = this.offer.price - (pay.discount * 0.0004);
    } else {
      next_points = this.points;
      this.amount = this.offer.price;
    }

    // Get strype token
    let body = `cvc=${pay.cvc}&exp_month=${pay.exp_month}&exp_year=${pay.exp_year}&number=${pay.number}&test=true`;
    this.alumProvider.getStripeToken(body).then(data => {
      this.stripe_token = data['id'];

      //TODO: Get pay amount

      // Pay with stripe
      body = `amount=${this.amount}&currency=eur&description=Particulary payment&source=${this.stripe_token}&stripe_account=acct_1CCVZNBQn2r701hB&test=true`;
      this.alumProvider.payStripe(body).then(data => {
        console.log(data);
        // Update my points
        next_points += this.offer.price * 100;
        this.alumProvider.updatePoints(next_points).then(data => {

          this.events.publish('points:update', next_points);

          // Apply to the offer
          this.offer.hired_hours = this.createPaymentForm.value.hired_hours;
          this.alumProvider.apply(this.offer).then(data => {
            this.toastCtrl.create({
              message: 'Apply correctly',
              duration: 3000,
              position: 'bottom'
            }).present();
            this.navCtrl.setRoot(HomePage);
          }).catch(err => {
            this.toastCtrl.create({
              message: err.error.message,
              duration: 3000,
              position: 'bottom'
            }).present();
          });
        });
      });
    });
  }
}
