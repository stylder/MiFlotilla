import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Camion} from '../../class/camion';

/*
  Generated class for the CamionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CamionesProvider {

  dbPath = '/camiones';


  itemsRef: AngularFireList<Camion>;
  items: Observable<Camion[]>;

  constructor(public afd: AngularFireDatabase) {

    this.itemsRef = afd.list(this.dbPath);

    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }


  getList() {
    return this.items;
  }

  addItem(item: Camion) {
    return this.itemsRef.push(item);
  }

  updateItem(key: string, item: Camion) {
    return this.itemsRef.update(key, item);
  }

  deleteItem(key: string) {
    return this.itemsRef.remove(key);
  }

}
