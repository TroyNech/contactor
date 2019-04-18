import { Component, OnInit } from '@angular/core';

import { UserProfileService } from '../shared/services/user/user-profile/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {
  contacts: Map<String, Object>;

  constructor(private userProfileService: UserProfileService, private router: Router,) { }

  ngOnInit() {
    this.contacts = this.userProfileService.getContacts();
  }
}
