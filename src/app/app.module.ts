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
import {EditAlumPage} from "../pages/edit-alum/edit-alum";
import {MyOffersPage} from "../pages/my-offers/my-offers";
import {CreateOfferPage} from "../pages/create-offer/create-offer";
import {EditOfferPage} from "../pages/edit-offer/edit-offer";
import {EditTeacherPage} from "../pages/edit-teacher/edit-teacher";
import {MyExperiencesPage} from "../pages/my-experiences/my-experiences";
import {CreateExperiencePage} from "../pages/create-experience/create-experience";
import {EditExperiencePage} from "../pages/edit-experience/edit-experience";
import {AlumProvider} from "../providers/alum/alum";
import {AllOffersPage} from "../pages/all-offers/all-offers";
import {MyMessagesPageTeacher} from "../pages/my-messages/my-messages";
import {MyMessagesPageAlum} from "../pages/my-messages/my-messages";
import {CreateMessagePageTeacher} from "../pages/create-message/create-message";
import {CreateMessagePageAlum} from "../pages/create-message/create-message";
import {RegisterPage} from "../pages/register/register";
import {AlumMyOffersPage} from "../pages/alum-myOffers/alum-myOffers";
import {TeacherMyOffersPage} from "../pages/teacher-myOffers/teacher-myOffers";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    EditAlumPage,
    MyOffersPage,
    CreateOfferPage,
    EditOfferPage,
    EditTeacherPage,
    MyExperiencesPage,
    CreateExperiencePage,
    EditExperiencePage,
    AllOffersPage,
    MyMessagesPageTeacher,
    MyMessagesPageAlum,
    CreateMessagePageTeacher,
    CreateMessagePageAlum,
    RegisterPage,
    AlumMyOffersPage,
    TeacherMyOffersPage,


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
    EditAlumPage,
    MyOffersPage,
    CreateOfferPage,
    EditOfferPage,
    EditTeacherPage,
    MyExperiencesPage,
    CreateExperiencePage,
    EditExperiencePage,
    AllOffersPage,
    MyMessagesPageTeacher,
    MyMessagesPageAlum,
    CreateMessagePageTeacher,
    CreateMessagePageAlum,
    RegisterPage,
    AlumMyOffersPage,
    TeacherMyOffersPage,


  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TeacherProvider,
    AlumProvider,
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
