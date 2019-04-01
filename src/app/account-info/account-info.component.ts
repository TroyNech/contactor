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

    let user = this.userProfileService.getUserProfile();
    if (user === undefined) {
      this.addPhoneForm("", "");
      this.addWebsiteForm("");
      return;
    }

    this.addPhoneForm(user['phoneNumbers'][0]['type'], user['phoneNumbers'][0]['number']);
    for (let i = 1; i < user['phoneNumbers'].length; i++) {
      this.addPhoneForm(user['phoneNumbers'][i]['type'], user['phoneNumbers'][i]['number']);
    }

    this.addWebsiteForm(user['websites'][0]);
    for (let i = 1; i < user['websites'].length; i++) {
      this.addWebsiteForm(user['websites'][i]);
    }

    this.contactInfo.controls.firstName.setValue(user['firstName']);
    this.contactInfo.controls.lastName.setValue(user['lastName']);
    this.contactInfo.controls.organization.setValue(user['organization']);
    this.contactInfo.controls.position.setValue(user['position']);
  }

  addPhoneForm(type: String, number: String) {
    let formArray = <FormArray>this.contactInfo.controls['phoneNumbers'];
    formArray.push(
      new FormGroup({
        type: this.formBuilder.control({ value: type, disabled: false }),
        number: this.formBuilder.control({ value: number, disabled: false })
      })
    );
  }

  addWebsiteForm(url: String) {
    let formArray = <FormArray>this.contactInfo.controls['websites'];
    formArray.push(new FormControl(url));
  }

  removePhoneForm(index: number) {
    let formArray = <FormArray>this.contactInfo.controls.phoneNumbers;
    formArray.removeAt(index);
  }

  removeWebsiteForm(index: number) {
    let formArray = <FormArray>this.contactInfo.controls['websites'];
    formArray.removeAt(index);
  }

  setUserInfo() {
    this.userProfileService.setUserProfile(this.contactInfo.getRawValue());
    this.router.navigateByUrl('home');
  }
}