
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public api: ApiProvider) {
  }

  login(user) {
    return this.api.post('login', user).then(data => {
      return data;
    });
  }

  register(user) {
    return this.api.post('register', user).then(data => {
      return data;
    });
  }
}
