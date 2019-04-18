import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserProfileService } from '../shared/services/user/user-profile/user-profile.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  public userData: Object;

  constructor(
    private userProfileService: UserProfileService,
    private router: Router) {
  }

  async ngOnInit() {
    this.userData = this.userProfileService.getUserProfile();
  }

  setUserInfo(data: Object) {
    this.userProfileService.setUserProfile(data);
    this.router.navigateByUrl('home');
  }
}