import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, ViewController} from 'ionic-angular';
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

  takePhoto() {

    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
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
      .putString(this.myPhoto, 'base64', { contentType: 'image/jpeg' })
      .then((savedPicture) => {
        this.groupForm.value.img  = savedPicture.downloadURL;
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
