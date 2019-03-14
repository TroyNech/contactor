import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  googleLogin(): Promise<firebase.auth.UserCredential> {
    /*   return this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '***REMOVED***', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    });
      
  } */
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider).then(function () {
      return firebase.auth().getRedirectResult();
    });
  }

  emailLogin(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  createEmailLogin(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/user/${newUserCredential.user.uid}`)
          .set({ email: email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  getUser(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        resolve(user);
      });
    });
  }

  async isUserLoggedIn(): Promise<boolean> {
    try {
      var user = await this.getUser();
    } catch (e) {
      console.log(e);
      return Promise.resolve(false);
    }
    
    //return new Promise((resolve, reject) => resolve(true));
    if (user) return Promise.resolve(true);
    return Promise.resolve(false);
    //return false;

/*     return new Promise((resolve, reject) => {
      this.getUser().then(user => {
        if (user) {
          return resolve;
        } else {
          //maybe logged in using Google account
          /*  this.googlePlus.trySilentLogin(
             {
               'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
               'webClientId': '***REMOVED***', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
               'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
             }).then(user => {
               resolve(true);
               //does execution continue here?
               console.log('executing after resolving');
             }); *//*
             return resolve(false);
        }
      })
        .catch(err => console.error(err));
        return resolve(false);
    }); */
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
