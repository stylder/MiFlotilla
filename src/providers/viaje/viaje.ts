import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Viaje} from '../../class/Viajes';

/*
  Generated class for the ViajeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViajeProvider {

  dbPath = '/viajes';


  itemsRef: AngularFireList<Viaje>;
  items: Observable<Viaje[]>;

  constructor(public afd: AngularFireDatabase) {

    this.itemsRef = afd.list(this.dbPath);

    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }


  getList() {
    return this.items;
  }

  addItem(item: Viaje) {
    return this.itemsRef.push(item);
  }

  updateItem(key: string, item: Viaje) {
    return this.itemsRef.update(key, item);
  }

  deleteItem(key: string) {
    return this.itemsRef.remove(key);
  }

  addMovimiento(id, movimiento) {
    this.afd.list('/viajes/' + id + '/movimientos/').push(movimiento);
  }

  deleteMovimiento(viaje: string, movimiento: any) {
    const path = 'viajes/' + viaje + '/movimentos/';
    this.afd.database.ref('viajes/').ref.child(viaje).child('/movimientos/' + movimiento).remove();
  }

}
