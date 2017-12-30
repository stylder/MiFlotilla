import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Viajes} from "../../class/Viajes";
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage implements OnInit {

  dateNow = new Date();

  viajes: Array<Viajes> = [];


  constructor(public navCtrl: NavController,
              private afd: AngularFireDatabase,
              public alertCtrl: AlertController) {

    this.afd.list('/viajes').valueChanges().subscribe(items => {
      console.log(items)
      this.viajes = items;
    })
    //this.shoppingItems = this.firebaseProvider.getShoppingItems();

  }

  range(last) {
    let arr=[]
    for(let i=0; i<last; i++){
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


}

