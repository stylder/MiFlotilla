import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, ModalController} from 'ionic-angular';
import {Viajes} from "../../class/Viajes";
import {AngularFireDatabase} from 'angularfire2/database';
import {ModalPage} from "../modal/modal";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage implements OnInit {

  dateNow = new Date();

  viajes: any[] = [];


  constructor(public navCtrl: NavController,
              public afd: AngularFireDatabase,
              public modalCtrl: ModalController) {

    this.afd.list('/viajes').valueChanges().subscribe(items => {
      console.log(items)
      this.viajes = items;
    })
    //this.shoppingItems = this.firebaseProvider.getShoppingItems();

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

