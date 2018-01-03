import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

/*
  Generated class for the ViajeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViajeProvider {

  constructor(public afd: AngularFireDatabase) {
  }

  getViajesList(): AngularFireList<any> {
    return this.afd.list('/viajes');
  }

  getViaje(id): AngularFireList<any> {
    return this.afd.list('/viajes/' + id);
  }

  addViaje(id, viaje) {
    this.afd.list('/viajes/' + id).push(viaje);
  }

  removeItem(id) {
    this.afd.list('/viajes/').remove(id);
  }

  addMovimiento(id, movimiento) {
    this.afd.list('/viajes/' + id + '/movimientos/').push(movimiento);
  }

}
