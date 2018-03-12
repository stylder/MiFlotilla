import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Viaje} from "../../class/Viajes";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {CamionesProvider} from "../../providers/camiones/camiones";
import {ViajeProvider} from "../../providers/viaje/viaje";

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  viaje: Viaje = {
    estrellas: 1,
    origen: '',
    destino: '',
    carga: {
      tipo: '',
      cantidad: ''
    }
  };

  camiones = [];

  private user: Observable<firebase.User>;

  constructor(public viewCtrl: ViewController,
              public authProvider: AuthProvider,
              private camionesProvider: CamionesProvider,
              private viajeProvider: ViajeProvider) {

    this.camionesProvider.getList()
      .subscribe(camiones => {
        this.camiones = camiones
      });

    this.user = this.authProvider.afAuth.authState;
    this.getUserInfo();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  guardarViaje() {
    this.viaje.date = (new Date(this.viaje.date).toDateString());
    this.viajeProvider.addItem(this.viaje);
    this.viewCtrl.dismiss();
  }

  getUserInfo() {
    this.user.subscribe(
      (user) => {
        if (user) {
          this.viaje.conductor = user.uid
        }
      }
    );
  }

}
