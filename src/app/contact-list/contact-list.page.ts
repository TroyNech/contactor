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
  }
}
