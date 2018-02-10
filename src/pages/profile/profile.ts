import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  moveon = true;
  imgurl: string;
  user;

  constructor(public auth : AuthProvider) {

    this.imgurl = 'assets/img/common/no-image.gif';
    this.auth.Session.subscribe(session => {
      if (session) {
        console.log('>>', session.photoURL);
        this.imgurl = session.photoURL;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  cerrarSesion(){
    this.auth.logout();
  }


  chooseimage(){

  }

  updateproceed(){

  }

}
