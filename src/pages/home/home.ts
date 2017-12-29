import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Viajes} from "../../class/Viajes";
import { Observable} from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage implements OnInit {

  dateNow = new Date();


  viajes: AngularFireList<Viajes[]>;

  constructor(public navCtrl: NavController,public afDatabase: AngularFireDatabase) {

  }

  ngOnInit() { }

  showViaje(id) {
    console.log('cambiar vista', id)
    this.navCtrl.push('ViajePage', {id: id});

  }

  ///////////////// FIREBASE /////////////////

  filterItems(ev: any) {
    let val = ev.target.value;
    console.log('>>>>', val)
  }


}

