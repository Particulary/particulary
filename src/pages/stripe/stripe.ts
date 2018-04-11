import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Stripe} from '@ionic-native/stripe';
import {AlumProvider} from "../../providers/alum/alum";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'stripe',
  templateUrl: 'stripe.html'
})
export class StripePage {

  stripe_token;
  createPaymentForm: FormGroup;
  amount = 1000;
  points = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private stripe: Stripe, private alumProvider: AlumProvider, private formBuilder: FormBuilder) {
    this.stripe.setPublishableKey('pk_live_EuJKkK58l167vDf6BLCQ3zyG');

    this.createPaymentForm = this.formBuilder.group({
      cvc: new FormControl('', [Validators.required, Validators.pattern('^\\d{3}$')]),
      exp_month: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern('^\\d+$')]),
      exp_year: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^\\d+$')]),
      number: new FormControl('', [Validators.required, Validators.pattern('^\\d{16}$')]),
      discount: new FormControl(''),
    });

    // Get my info: points
    this.alumProvider.infoAlum().then(data => {
      this.points = data['particulary_points'];


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
        this.alumProvider.updatePoints(12).then(() => {
        });
      });
    });
  }
}
