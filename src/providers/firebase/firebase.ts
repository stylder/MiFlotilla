import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) { }

  getShoppingItems() {
    return this.afd.list('/viajes').valueChanges().subscribe(console.log);
  }

  addItem(name) {
    this.afd.list('/viajes/').push(name);
  }

  removeItem(id) {
    this.afd.list('/viajes/').remove(id);
  }
}
