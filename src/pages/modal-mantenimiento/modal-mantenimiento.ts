import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Viaje} from "../../class/Viajes";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {CamionesProvider} from "../../providers/camiones/camiones";
import {ViajeProvider} from "../../providers/viaje/viaje";

/**
 * Generated class for the ModalMantenimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-mantenimiento',
  templateUrl: 'modal-mantenimiento.html',
})
export class ModalMantenimientoPage {

  camiones = [];


  constructor(public viewCtrl: ViewController,

              private camionesProvider: CamionesProvider,
              private viajeProvider: ViajeProvider) {

    this.camionesProvider.getList()
      .subscribe(camiones => {
        this.camiones = camiones
      });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  guardarViaje() {
    this.viewCtrl.dismiss();
  }



}
