import { ActionSheetController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import firebase from 'firebase';
import { ViajeProvider } from "../../providers/viaje/viaje";
import { Viaje } from "../../class/Viajes";

/**
 * Generated class for the ViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viaje',
  templateUrl: 'viaje.html',
})
export class ViajePage {

  myPhotosRef: any;
  myPhoto: any;
  myPhotoURL: any;
  id;
  viaje: Viaje = {
    origen:'',
    destino: '',
    key:'',
    carga: {
      cantidad:'',
      tipo: ''
    }
  };
  movimientos: any[];

  constructor(public viajesProvider: ViajeProvider,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public Camera: Camera) {

    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 400
    });
    loader.present();


    this.myPhotosRef = firebase.storage().ref('/movimientos/');
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
      return [];
    }
  }

  ionViewDidLoad() {
    const id = this.navParams.get('id');
    this.id = id.key !== undefined ? id.key : '';
    this.viaje = id;
    this.viajesProvider.getItem(id.key).valueChanges().subscribe((viaje: any) => {
      this.viaje = viaje;
      if(viaje.movimientos !== null){
        this.movimientos = this.getArrayObject(this.viaje.movimientos);
      }else{
        this.movimientos = [];
      }
    });
  }

  takePhoto(type) {

    this.Camera.getPicture({
      quality: 50,
      destinationType: this.Camera.DestinationType.DATA_URL,
      sourceType: type,
      encodingType: this.Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(imageData => {
      this.presentLoading();
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Subiendo comprobante",
      duration: 600
    });
    loader.present();
  }


  uploadPhoto() {

    this.myPhotosRef.child(this.generateUUID() + '.jpeg')
      .putString(this.myPhoto, 'base64', { contentType: 'image/jpeg' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;


        let prompt = this.alertCtrl.create({
          title: 'Cantidad',
          message: "Ingresa el monto del movimiento",
          inputs: [
            {
              name: 'cantidad',
              placeholder: 'Cantidad',
              type: 'number'
            },
            {
              name: 'descripcion',
              placeholder: 'Descripcion',
              type: 'text'
            },
          ],
          buttons: [
            {
              text: 'Cancelar',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Guardar',
              handler: data => {

                const movimiento = {
                  cantidad: data.cantidad,
                  descripcion: data.descripcion,
                  img: this.myPhotoURL
                };

                console.log('Saved clicked', data);

                this.viajesProvider.addMovimiento(this.id, movimiento)
                this.movimientos.push(movimiento);
              }
            }
          ]
        });
        prompt.present();


      });
  }

  showOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modifica tu movimiento',
      buttons: [
        {
          text: 'Fotografía',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePhoto(this.Camera.PictureSourceType.CAMERA)
          }
        },
        {
          text: 'Galería',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.takePhoto(this.Camera.PictureSourceType.PHOTOLIBRARY)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


  actionMovimiento(movimiento) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modifica tu movimiento',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Eliminar movimiento :::::', movimiento);

            console.log(movimiento);
            const object = this.viaje.movimientos
            const keys = Object.keys(object);
            let id = 0;
            for (const value of keys) {
              if (object[value].cantidad === movimiento.cantidad && object[value].descripcion === movimiento.descripcion) {

                this.viajesProvider.deleteMovimiento(this.id, this.getIDMovimiento(movimiento))
              }
              id++;
            }

          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteMovimiento() {
    //this.mantenimientoProvider.deleteMovimiento(this.viaje.key, this.getIDMovimiento(movimiento))
  }

  getIDMovimiento(movimiento) {
    const object = this.viaje.movimientos
    const keys = Object.keys(object);
    for (const value of keys) {
      if (object[value].cantidad === movimiento.cantidad && object[value].descripcion === movimiento.descripcion) {
        return value;
      }
    }
    return null;
  }
}
