import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MantenimientoPage} from '../pages/mantenimiento/mantenimiento'
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ModalPage } from '../pages/modal/modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {environment} from '../environments/environment';

// PIPES
import {PipesModule} from '../pipes/pipes.module';

// PROVIDERS
import { AuthProvider } from '../providers/auth/auth';
import { ViajeProvider } from '../providers/viaje/viaje';
import { CamionesProvider } from '../providers/camiones/camiones';
import { MantenimientoProvider } from '../providers/mantenimiento/mantenimiento';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MantenimientoPage,
    LoginPage,
    ProfilePage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MantenimientoPage,
    LoginPage,
    ProfilePage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ViajeProvider,
    CamionesProvider,
    MantenimientoProvider,
  ]
})
export class AppModule {}
