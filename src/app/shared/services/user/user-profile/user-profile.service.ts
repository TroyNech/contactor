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
        this.userProfileReference
          .onSnapshot((doc) => {
            this.userData = doc;
          });
      }
    });
  }

  async loadUserProfile(): Promise<Boolean> {
    if (this.userProfileReference === undefined) {
      console.log("User does not have profile");
      return false;
    }

    try {
      this.userData = await this.userProfileReference.get();
    }
    catch (e) {
      console.log("User does not have profile");
      return false;
    }
    return true;
  }

  getUserProfile(): Object {
    if (this.currentUser === undefined || this.userData === undefined) {
      console.log("Error getting user document: User not logged in or no profile avaiable");
      return undefined;
    }

    return this.userData.data();
  }

  userHasProfile(): Promise<Boolean> {
    if (this.userData === undefined) {
      return this.loadUserProfile();
    }

    return Promise.resolve(true);
  }

  setUserProfile(userInfo: Object) {
    //remove any extra empty phone numbers and websites (need at least 1, regardless of value)
    for (let i = 1; i < userInfo['phoneNumbers'].length; i++) {
      if (userInfo['phoneNumbers'][i].number === null || userInfo['phoneNumbers'][i].number === "") {
        userInfo['phoneNumbers'].pop(i);
      }
    }
    for (let i = 1; i < userInfo['websites'].length; i++) {
      if (userInfo['websites'][i] === null || userInfo['websites'][i] === "") {
        userInfo['websites'].pop(i);
      }
    }

    console.log(userInfo);

    this.userProfileReference.set(userInfo)
      .catch(e => {
        console.log("Error setting user profile: " + e);
      });
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