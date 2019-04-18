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
  qrCodeToggle: boolean;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private userProfileService: UserProfileService,
    private toastController: ToastController) {
    this.qrCodeToggle = false;
    let userData = this.userProfileService.getUserProfile();
    this.myAngularxQrCode = JSON.stringify(userData);
  }

  toggleQrCode() {
    this.qrCodeToggle = !this.qrCodeToggle;
  }

  scanCode() {
    let scannedData: Object;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log(barcodeData.text);
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
