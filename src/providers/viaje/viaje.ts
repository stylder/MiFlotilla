import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Viaje} from '../../class/Viajes';
import {AuthProvider} from "../auth/auth";

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

  constructor(public afd: AngularFireDatabase, public auth: AuthProvider) {


    this.itemsRef = afd.list(this.dbPath);

    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  getItem (id) {
    return this.afd.object(this.dbPath + '/' + id);
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

  deleteMovimiento(viaje: string, movimiento: string) {
    console.log('Delete Movimiento', viaje, movimiento);
    
    this.afd.database.ref('viajes/').ref.child(viaje).child('/movimientos/' + movimiento).remove();
  }

}
