import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";

import { StatusBar } from '@ionic-native/status-bar';
import { TeacherProvider } from '../providers/teacher/teacher';
import { ApiProvider } from '../providers/api/api';
import { TokenInterceptor } from '../providers/teacher/TokenInterceptor';

import { DaysTillTodayPipe } from '../pipes/days-till-today/days-till-today';
import { ParseDatePipe } from "../pipes/parse-date/parse-date";
import { LoginProvider } from "../providers/login/login";
import {MyOffersPage} from "../pages/my-offers/my-offers";
import {CreateOfferPage} from "../pages/create-offer/create-offer";
import {EditOfferPage} from "../pages/edit-offer/edit-offer";
import {EditTeacherPage} from "../pages/edit-teacher/edit-teacher";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MyOffersPage,
    CreateOfferPage,
    EditOfferPage,
    EditTeacherPage,

    // Pipes
    DaysTillTodayPipe,
    ParseDatePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MyOffersPage,
    CreateOfferPage,
    EditOfferPage,
    EditTeacherPage,

  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TeacherProvider,
    LoginProvider,
    ApiProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
