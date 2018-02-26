import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViajeProvider } from '../../providers/viaje/viaje';

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
    public mantenimientosProvider: ViajeProvider,
    public modalCtrl: ModalController) {


    this.mantenimientosProvider.getList()
      .subscribe(mantenimientos => {
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
    this.navCtrl.push('ViajePage', { id: id });
  }

  ///////////////// FIREBASE /////////////////
  filterItems(ev: any) {
    let val = ev.target.value;
    this.searchTerm = val
    console.log('>>>>', this.searchTerm)
  }

  openModal() {
    //const data = { message: 'hello world' };
    //const modalPage = this.modalCtrl.create(ModalPage, data);
    //modalPage.present();
  }


  openBasicModal() {
    //let myModal = this.modalCtrl.create(ModalPage);
    //myModal.present();
  }

}

