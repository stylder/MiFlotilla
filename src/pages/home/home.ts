import {Component, OnInit} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {ModalPage} from "../modal/modal";
import {ViajeProvider} from "../../providers/viaje/viaje";
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage implements OnInit {


  viajes: any[];
  searchTerm: string;
  uid: string;


  constructor(public navCtrl: NavController,
              public viajesProvider: ViajeProvider,
              private authProvider: AuthProvider,
              public modalCtrl: ModalController) {


    this.viajesProvider.getList()
      .subscribe(viajes => {
        this.viajes = viajes;
      });

    this.authProvider.Session.subscribe(session => {
      if (session) {
        this.uid = session.uid;
      } 
    });
  }

  getArrayObject(object) {
    if (object) {
      return Object.keys(object);
    } else {
      return null;
    }
  }

  range(last) {
    let arr = [];
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
    this.searchTerm = val
    console.log('>>>>', this.searchTerm)
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

