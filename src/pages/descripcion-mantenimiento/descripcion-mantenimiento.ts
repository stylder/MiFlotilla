import {MantenimientoProvider} from '../../providers/mantenimiento/mantenimiento'
import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams,
  Platform
} from 'ionic-angular';
import {Mantenimiento} from "../../class/Mantenimiento";
import {Camera} from "@ionic-native/camera";
import firebase from 'firebase';


/**
 * Generated class for the DescripcionMantenimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-descripcion-mantenimiento',
  templateUrl: 'descripcion-mantenimiento.html',
})
export class DescripcionMantenimientoPage {


  mantenimiento: Mantenimiento;
  movimientos = [];
  key: string;

  myPhotosRef: any;
  myPhoto: any;
  myPhotoURL: any;


  constructor(public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public Camera: Camera,
              private mantenimientoProvider: MantenimientoProvider) {

    this.myPhotosRef = firebase.storage().ref('/movimientos/');

  }

  ionViewDidLoad() {
    const id = this.navParams.get('id');
    this.key = id;
    this.mantenimientoProvider.getItem(id)
      .valueChanges().subscribe((mantenimiento: Mantenimiento) => {
      this.mantenimiento = mantenimiento;
      if (mantenimiento.movimientos) {
        this.movimientos = this.getArrayObject(mantenimiento.movimientos);
      }
    })
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
                console.log('Cancel clicked', data);
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


                this.mantenimientoProvider.addMovimiento(this.key, movimiento);
              }
            }
          ]
        });
        prompt.present();


      });
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
            const object = this.mantenimiento.movimientos;
            const keys = Object.keys(object);
            let id = 0;
            for (const value of keys) {
              if (object[value].cantidad === movimiento.cantidad && object[value].descripcion === movimiento.descripcion) {

                this.mantenimientoProvider.deleteMovimiento(this.key, this.getIDMovimiento(movimiento))
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

  getIDMovimiento(movimiento) {
    const object = this.mantenimiento.movimientos;
    const keys = Object.keys(object);
    for (const value of keys) {
      if (object[value].cantidad === movimiento.cantidad && object[value].descripcion === movimiento.descripcion) {
        return value;
      }
    }
    return null;
  }

  generateUUID(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  updateImgMantenimiento (){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modifica tu movimiento',
      buttons: [
        {
          text: 'Fotografía',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.upload(this.Camera.PictureSourceType.CAMERA)
          }
        },
        {
          text: 'Galería',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.upload(this.Camera.PictureSourceType.PHOTOLIBRARY)
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


  upload(type){
    this.Camera.getPicture({
      quality: 50,
      destinationType: this.Camera.DestinationType.DATA_URL,
      sourceType: type,
      encodingType: this.Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(imageData => {
      this.presentLoading();
      this.myPhotosRef.child(this.generateUUID() + '.jpeg')
        .putString(imageData, 'base64', {contentType: 'image/jpeg'})
        .then((savedPicture) => {
          this.mantenimiento.img = savedPicture.downloadURL;
          this.mantenimientoProvider.updateItem(this.key, this.mantenimiento)

        });
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }


}
