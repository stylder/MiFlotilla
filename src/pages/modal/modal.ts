import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  viaje = {
    estrellas: 1,
    movimientos: 0
  };

  camiones = [];

  constructor(public viewCtrl: ViewController,
              public afd: AngularFireDatabase) {
    this.afd.list('/camiones').valueChanges().subscribe(items => {
      console.log(items);
      this.camiones = items;
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  guardarViaje() {
    console.log('Guardando viaje', this.viaje);
    this.afd.list('/viajes/').push(this.viaje);
    this.viewCtrl.dismiss();
  }

}
