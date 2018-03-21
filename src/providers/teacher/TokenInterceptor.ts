
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

    token: string = 'iRV5XSbrgcttVViF18NHFaS0fDMnU13SsXBHNkGaTZtuUREnMI0sSy0sJJ6y';

    constructor(private storage: Storage, private events: Events) {
      events.subscribe('token:update', (token) => {
          this.token = token;
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
