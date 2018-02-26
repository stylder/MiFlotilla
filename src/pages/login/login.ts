import {Component} from '@angular/core';
import {IonicPage, AlertController} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myForm: FormGroup;

  constructor(public auth: AuthProvider,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController) {

    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login() {
    this.auth.loginUser(this.myForm.value.email, this.myForm.value.password).then((user) => {
      console.log(user)
    }).catch(err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  }



}
