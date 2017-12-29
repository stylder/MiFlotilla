import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage  implements OnInit{

  dateNow = new Date();
  listaViajes;


  constructor(public navCtrl: NavController, ) {
    this.listaViajes = this.afd.list('viajes');
  }

  ngOnInit() {
    // ...
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

  getItemsList() {

  }

  addViaje() {
    this.afd.list('/viajes/').push({});

  }
}

