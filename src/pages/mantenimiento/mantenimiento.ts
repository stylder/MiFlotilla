import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MantenimientoProvider} from '../../providers/mantenimiento/mantenimiento';
import {ModalPage} from "../modal/modal";
import * as firebase from "firebase";
import enableLogging = firebase.database.enableLogging;

/**
 * Generated class for the MantenimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mantenimiento',
  templateUrl: 'mantenimiento.html',
})
export class MantenimientoPage {

  mantenimientos: any[];
  searchTerm: string;


  constructor(public navCtrl: NavController,
              public mantenimientoProvider: MantenimientoProvider,
              public modalCtrl: ModalController) {


    this.mantenimientoProvider.getList()
      .subscribe(mantenimientos => {
        console.log('Mantenimientos', mantenimientos);
        this.mantenimientos = mantenimientos;
      });
  }

  getArrayObject(object) {
    if (object) {
      return Object.keys(object);
    } else {
      return null;
    }
  }

  ngOnInit() {
  }

  showViaje(id) {
    console.log('cambiar vista', id);
    this.navCtrl.push('ViajePage', {id: id});
  }

  filterItems(ev: any) {
    this.searchTerm = ev.target.value;
  }

  openModal() {
    const data = {message: 'hello world'};
    const modalPage = this.modalCtrl.create(ModalPage, data);
    modalPage.present();
  }


  openBasicModal() {
    let myModal = this.modalCtrl.create(ModalPage);
    myModal.present();
  }

}

