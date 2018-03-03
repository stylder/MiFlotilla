import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, LoadingController, Platform,
  ViewController
} from 'ionic-angular';
import {Viaje} from "../../class/Viajes";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {CamionesProvider} from "../../providers/camiones/camiones";
import {MantenimientoProvider} from "../../providers/mantenimiento/mantenimiento";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the ModalMantenimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-mantenimiento',
  templateUrl: 'modal-mantenimiento.html',
})
export class ModalMantenimientoPage {

  camiones = [];

  groupForm: FormGroup;
  myPhotosRef: any;
  myPhoto: any;



  constructor(public viewCtrl: ViewController,
              private fb: FormBuilder,
              private camera:Camera,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              private camionesProvider: CamionesProvider,
              private mantenimientoProvider: MantenimientoProvider) {

    this.buildForm();
    this.camionesProvider.getList()
      .subscribe(camiones => {
        this.camiones = camiones
      });

    this.myPhotosRef = firebase.storage().ref('/movimientos/');

  }

  buildForm() {
    this.groupForm = this.fb.group({
      camion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      date: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      img: ['assets/img/common/no-image.gif']
    })
  }



  takePhoto (){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modifica tu movimiento',
      buttons: [
        {
          text: 'Fotografía',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.upload(this.camera.PictureSourceType.CAMERA)
          }
        },
        {
          text: 'Galería',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.upload(this.camera.PictureSourceType.PHOTOLIBRARY)
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
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: type,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(imageData => {
      this.myPhotosRef.child(this.generateUUID() + '.jpeg')
        .putString(imageData, 'base64', {contentType: 'image/jpeg'})
        .then((savedPicture) => {
          this.groupForm.value.img  = savedPicture.downloadURL;
        });
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  addMantenimiento(movimiento){
    this.mantenimientoProvider.addItem(movimiento);
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  private generateUUID(): any {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


}
