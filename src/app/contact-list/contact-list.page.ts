import { Component, OnInit } from '@angular/core';

import { UserProfileService } from '../shared/services/user/user-profile/user-profile.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {
  contactsArray: [String, Object][];

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    let contacts = this.userProfileService.getContacts();
    this.contactsArray = Array.from(contacts);

    this.contactsArray.sort((a, b) => {
      return (a[1]['firstName'] + ' ' + a[1]['lastName']).localeCompare((b[1]['firstName'] + ' ' + b[1]['lastName']));
    });
  }
}
