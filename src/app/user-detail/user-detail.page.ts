import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../shared/services/user/login/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Log out?',
      message: 'Confirm log out',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          cssClass: 'danger',
          handler: async () => {
            await this.loginService.logoutUser();
            this.router.navigateByUrl('login');
          }
        }
      ]
    });

    await alert.present();
  }
}
