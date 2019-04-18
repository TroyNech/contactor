import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

import { UserProfileService } from '../shared/services/user/user-profile/user-profile.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public myAngularxQrCode: string;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private userProfileService: UserProfileService,
    private toastController: ToastController) { }

  createCode() {
    let userData = this.userProfileService.getUserProfile();
    this.myAngularxQrCode = JSON.stringify(userData);
  }

  scanCode() {
    let scannedData: Object;
    this.barcodeScanner.scan().then(barcodeData => {
      scannedData = JSON.parse(barcodeData.text);
      this.userProfileService.setContact(scannedData);
    }).then(async () => {
        const toast = await this.toastController.create({
          message: 'Contact ' + scannedData['firstName'] + scannedData['lastName'],
          duration: 2000,
        });
        toast.present();
    })
      .catch(err => {
        console.log('Error scanning code', err);
      });
  }

  goToUserDetail() {
    this.router.navigateByUrl('user-detail');
  }
}
