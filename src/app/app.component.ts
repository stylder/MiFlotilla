import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {AuthProvider} from '../providers/auth/auth';
import { MantenimientoPage } from '../pages/mantenimiento/mantenimiento';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private auth: AuthProvider) {

    this.initializeApp();

    this.auth.Session.subscribe(session => {
      if (session) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Viajes', component: HomePage},
      {title: 'Mantenimientos', component: MantenimientoPage},
      {title: 'Perfil', component: ProfilePage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
