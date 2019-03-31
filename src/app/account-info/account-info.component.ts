import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { LoginService } from '../shared/services/user/login/login.service';
import { UserProfileService } from '../shared/services/user/user-profile/user-profile.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  public contactInfo: FormGroup;

  constructor(
    private loginService: LoginService,
    private userProfileService: UserProfileService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.contactInfo = this.formBuilder.group({
      email: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumbers: this.formBuilder.array([]),
      websites: this.formBuilder.array([]),
      organization: [''],
      position: ['']
    });
  }

  async ngOnInit() {
    this.loginService.getUser().then(user => {
      this.contactInfo.get("email").setValue(user.email);
    });
    this.contactInfo.get("email").disable();
    this.addPhoneForm();
    this.addWebsiteForm();
  }

  addPhoneForm() {
    let formArray = <FormArray>this.contactInfo.controls['phoneNumbers'];
    formArray.push(
      new FormGroup({
        type: new FormControl(),
        number: new FormControl()
      })
    );
  }

  addWebsiteForm() {
    let formArray = <FormArray>this.contactInfo.controls['websites'];
    formArray.push(new FormControl());
  }

  setUserInfo() {
    this.userProfileService.setUserProfile(this.contactInfo.getRawValue);
    this.router.navigateByUrl('home');
  }
}
