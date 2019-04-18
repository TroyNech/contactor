import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserProfileService } from '../../shared/services/user/user-profile/user-profile.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage {
  contactData: Array<Object>;

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let contactId = this.route.snapshot.paramMap.get("contactId");
    this.contactData = this.userProfileService.getContact(contactId);
  }

  setContactInfo(data: Object) {
    this.userProfileService.setContact(data);
    this.router.navigateByUrl('contact-list');
  }

  async deleteContact() {
    const alert = await this.alertController.create({
      header: 'Delete contact?',
      message: 'Confirm contact deletion',
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
            await this.userProfileService.deleteContact(<string>this.contactData[0]);
            this.router.navigateByUrl('contact-list');
          }
        }
      ]
    });

    await alert.present();
  }
}