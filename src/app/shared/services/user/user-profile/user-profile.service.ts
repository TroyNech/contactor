import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public userData: firebase.firestore.DocumentSnapshot;
  public contactsData: Map<string, Object>;
  public userDataReference: firebase.firestore.DocumentReference;
  public userContactsReference: firebase.firestore.CollectionReference;
  public currentUser: firebase.User;

  constructor() {
    this.contactsData = new Map();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userDataReference = firebase.firestore().doc(`/app/user/${user.uid}/contactInfo`);
        this.userDataReference
          .onSnapshot((doc) => {
            this.userData = doc;
          });
        this.userContactsReference = firebase.firestore().collection(`/app/user/${user.uid}/contacts/contacts`);
        this.userContactsReference
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.contactsData.set(doc.id, doc.data());
            });
          });
      }
    });
  }

  async loadUserProfile(): Promise<Boolean> {
    if (this.userDataReference === undefined) {
      console.log("User does not have profile");
      return false;
    }

    try {
      this.userData = await this.userDataReference.get();
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

  async userHasProfile(): Promise<Boolean> {
    if (this.userData === undefined) {
      let userProfileLoaded = await this.loadUserProfile();
      if (userProfileLoaded && this.userData !== undefined) {
        return Promise.resolve(this.userData.data()['firstName'] !== undefined);
      }
      return Promise.resolve(false);
    } else {
      return Promise.resolve(this.userData.data()['firstName'] !== undefined);
    }
  }

  setUserProfile(userInfo: Object) {
    console.log(userInfo);
    userInfo = this.sanitizeContactData(userInfo);
    this.cleanContactData(userInfo);

    console.log('settingUserData');
    console.log(userInfo);

    this.userDataReference.set(userInfo)
      .catch(e => {
        console.log("Error setting user profile: " + e);
      });
  }

  private cleanContactData(userInfo: Object) {
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
        this.userDataReference.update({ email: newEmail });
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

  setContact(contact: Object, id: String = null) {
    console.log('hi1');
    console.log(contact);
    contact = this.sanitizeContactData(contact);
    console.log('hi2');
    console.log(contact);
    this.cleanContactData(contact);

    if (this.isEmpty(contact['firstName']) || this.isEmpty(contact['lastName'])) {
      throw "Contact has no name: " + JSON.stringify(contact);
    }

    if (id === null) {
      this.userContactsReference.add(contact).catch(e => {
        console.log("Error setting contact: " + e);
      });
    } else {
      //else, update existing contact
      this.userContactsReference.doc(<string>id).set(contact)
        .catch(e => {
          console.log("Error setting contact: " + e);
        });
    }
  }

  private sanitizeContactData(contact: Object): Object {
    var cleanedContact: Object = {};

    cleanedContact['firstName'] = (contact['firstName'] === undefined) ? "" : contact['firstName'];
    cleanedContact['lastName'] = (contact['lastName'] === undefined) ? "" : contact['lastName'];
    cleanedContact['organization'] = (contact['organization'] === undefined) ? "" : contact['organization'];
    cleanedContact['phoneNumbers'] = (contact['phoneNumbers'] === undefined) ? [{'type': "", 'number': ""}] : contact['phoneNumbers'];
    cleanedContact['websites'] = (contact['websites'] === undefined) ? [""] : contact['websites'];
    cleanedContact['position'] = (contact['position'] === undefined) ? "" : contact['position'];
    cleanedContact['email'] = (contact['email'] === undefined) ? "" : contact['email'];

    return cleanedContact;
  }

  private isEmpty(str: String) {
    return (str === undefined || str === null || str === "");
  }

  deleteContact(contactId: string) {
    this.userContactsReference.doc(contactId).delete()
      .then(() => {
        this.contactsData.delete(contactId);
      })
      .catch(e => {
        console.log("Error deleting contact: " + e);
        this.contactsData.delete(contactId);
      });;
  }

  getContacts(): Map<string, Object> {
    //returning contactsData is valid in this case since it will be an empty map,
    // but want to keep the behaviour of error if user not logged in (like getUser)
    if (this.currentUser === undefined || this.userData === undefined) {
      console.log("Error getting user document: User not logged in or no profile avaiable");
      return undefined;
    }

    return this.contactsData;
  }

  getContact(contactId): Array<Object> {
    //returning contactsData is valid in this case since it will be an empty map,
    // but want to keep the behaviour of error if user not logged in (like getUser)
    if (this.currentUser === undefined || this.userData === undefined) {
      console.log("Error getting user document: User not logged in or no profile avaiable");
      return undefined;
    }

    return [contactId, this.contactsData.get(contactId)];
  }

}