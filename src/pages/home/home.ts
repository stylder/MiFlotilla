import {Component, OnInit} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {ModalPage} from "../modal/modal";
import {ViajeProvider} from "../../providers/viaje/viaje";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage implements OnInit {


  viajes: any[] = [];


  constructor(public navCtrl: NavController,
              public viajesProvider: ViajeProvider,
              public modalCtrl: ModalController) {

    this.viajesProvider.getViajesList().snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val()}));
    }).subscribe(items => {
      this.viajes = items;
      console.log('Viajes ', this.viajes);
      return items.map(item => item.key);
    });
  }

  getArrayObject(object) {
    if (object) {
      const array = [];
      const keys = Object.keys(object);
      for (const value of keys) {
        array.push(object[value])
      }
      return array;
    } else {
      return null;
    }
  }

  range(last) {
    let arr = []
    for (let i = 0; i < last; i++) {
      arr.push(i)
    }
    return arr;
  }

  ngOnInit() {

  }

  showViaje(id) {
    console.log('cambiar vista', id)
    this.navCtrl.push('ViajePage', {id: id});
  }

  ///////////////// FIREBASE /////////////////
  filterItems(ev: any) {
    let val = ev.target.value;
    console.log('>>>>', val)
  }

  openModal() {
    console.log('modal')
    var data = {message: 'hello world'};
    var modalPage = this.modalCtrl.create(ModalPage, data);
    modalPage.present();
  }


  openBasicModal() {
    let myModal = this.modalCtrl.create(ModalPage);
    myModal.present();
  }

}

