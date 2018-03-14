
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Events} from "ionic-angular";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    token: string;

    constructor(private storage: Storage, private events: Events) {
        this.storage.get('api_token').then((val) => {
          this.token = (val === null) ? '' : val;
        }).catch((err) => {
          this.token = '';
        });

        this.events.subscribe('user:reloadData', api_token => {
          this.token = api_token;
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token.length > 0) {
            request = request.clone({
                params: request.params.append('api_token', this.token)

            });
        }

        return next.handle(request);
    }
}
