import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user;
  firedata = firebase.database().ref('/users');


  constructor(public afAuth :  AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  // Login de usuario
  loginUser(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user=>{
        Promise.resolve(user)
        this.user = user;
        return user
      })
      .catch(err=>Promise.reject(err))
  }

  // Logout de usuario
  logout(){
    this.afAuth.auth.signOut().then(()=>{
      //this.navCtrl.setRoot(LoginPage);
    })
  }

// Devuelve la session
  get Session(){
    return this.afAuth.authState;
  }

  get User(){
    return this.user;
  }


  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afAuth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afAuth.auth.currentUser.photoURL,
          uid: this.afAuth.auth.currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }

  updateimage(imageurl) {
    const promise = new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: this.afAuth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afAuth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getuserdetails() {
    const promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }

}
