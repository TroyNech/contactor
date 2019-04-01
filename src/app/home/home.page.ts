import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scannedData: Object;
  public myAngularxQrCode: string;

  constructor(private barcodeScanner: BarcodeScanner, private router: Router) { }

  createCode() {
    let data = { "email": "nech5860@mylaurier.ca", "id": 150405860 };
    this.myAngularxQrCode = JSON.stringify(data);
  }

  scanCode() {
    console.log("scanning...");
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedData = JSON.stringify(JSON.parse(barcodeData.text));
    }).catch(err => {
      console.log('Error', err);
    });
  }

  goToUserDetail() {
    this.router.navigateByUrl('user-detail');
  }
}
