import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public userData: firebase.firestore.DocumentSnapshot;
  public userProfileReference: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfileReference = firebase.firestore().doc(`/user/${user.uid}`);
        firebase.firestore().doc(`/user/${user.uid}`)
          .onSnapshot(function (doc) {
            this.userData = doc;
          });
      }
    });
  }

  getUserProfile(): Object {
    if (this.currentUser === undefined || this.userData === undefined) {
      console.log("Error getting user document: User not logged in or no profile avaiable");
      return undefined;
    }

    return this.userData.data();
  }

  userHasProfile(): Boolean {
    return this.userData !== undefined;
  }

  setUserProfile(userInfo: Object) {
    this.userProfileReference.set(userInfo)
    .catch(e => {
      console.log("Error setting user profile: " + e);
    });
  }

  setName(firstName: string, lastName: string): Promise<any> {
    return this.userProfileReference.update({ firstName, lastName });
  }

  async setEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );

    try {
      await this.currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential);
      this.currentUser.updateEmail(newEmail).then(() => {
        this.userProfileReference.update({ email: newEmail });
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  async setPassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    try {
      await this.currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential);
      this.currentUser.updatePassword(newPassword).then(() => {
        console.log('Password Changed');
      });
    }
    catch (error) {
      console.error(error);
    }
  }
}