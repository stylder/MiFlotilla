import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import firebase from 'firebase';
import {ViajeProvider} from "../../providers/viaje/viaje";
import {AlertController} from 'ionic-angular';

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
  movimientos: any = [
    {
      cantidad: 1,
      descripcion: '',
      img: ''
    }
  ];


  viaje: any = {};

  constructor(public viajesProvider: ViajeProvider,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public Camera: Camera) {
    this.viaje = navParams.get('id');

    console.log('Viaje: ', this.viaje)
    this.movimientos = this.getArrayObject(this.viaje.movimientos)


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
      return null;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViajePage', this.id);
  }

  takePhoto() {
    this.Camera.getPicture({
      quality: 50,
      destinationType: this.Camera.DestinationType.DATA_URL,
      sourceType: this.Camera.PictureSourceType.CAMERA,
      encodingType: this.Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }


  uploadPhoto() {

    this.myPhotosRef.child(this.generateUUID() + '.jpeg')
      .putString(this.myPhoto, 'base64', {contentType: 'image/jpeg'})
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
                this.viajesProvider.addMovimiento(this.viaje.key, movimiento)
                this.movimientos.push(movimiento);
              }
            }
          ]
        });
        prompt.present();


      });
  }

  showPrompt() {

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
}
