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

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon = true;

  user;
  constructor(public auth : AuthProvider) {

    this.user = this.auth.User
    console.log('>>', this.user)
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
