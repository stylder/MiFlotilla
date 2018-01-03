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
  keys = [];

  viaje: any = {
    movimientos: [
      {
        cantidad: 1,
        descripcion: '',
        img: ''
      }
    ]
  };

  constructor(public viajesProvider: ViajeProvider,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public Camera: Camera) {
    this.viaje = navParams.get('id');

    this.viajesProvider.getViaje(this.viaje.key).snapshotChanges().map(actions => {
      console.log('ACT::::', actions);
      return actions.map(action => ({key: action.key, ...action.payload.val()}));
    }).subscribe(items => {
      console.log('::::', items);
      return items.map(item => item.key);
    });
    console.log('Viaje: ', this.viaje)

    this.keys = this.viaje.movimientos != null ? Object.keys(this.viaje.movimientos) : [];


    this.myPhotosRef = firebase.storage().ref('/photos/');


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
