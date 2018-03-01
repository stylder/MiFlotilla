import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalMantenimientoPage } from './modal-mantenimiento';

@NgModule({
  declarations: [
    ModalMantenimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalMantenimientoPage),
  ],
})
export class ModalMantenimientoPageModule {}
