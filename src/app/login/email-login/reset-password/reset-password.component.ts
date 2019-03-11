import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';

import { LoginService } from '../../../shared/services/user/login/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public loginForm: FormGroup;
  public passwordReset: boolean;
  public resetSuccess: boolean;

  //email user may have already entered trying to login
  @Input() email: string;
  constructor(
    public alertCtrl: AlertController,
    navParams: NavParams,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private modalController: ModalController) {
    this.loginForm = this.formBuilder.group({
      email: [navParams.get('email'),
      Validators.compose([Validators.required, Validators.email])]
    });
    this.passwordReset = false;
    this.resetSuccess = false;
  }

  ngOnInit() { }

  resetPassword(email: string) {
    this.passwordReset = true;
    this.loginService.resetPassword(email).then(
      () => {
        // this.passwordReset = true;
        this.resetSuccess = true;
      },
      error => {
        // this.passwordReset = true;
        this.resetSuccess = false;
      }
    ).finally(() => {
      setTimeout(() => {
        this.modalController.dismiss();
      }, 1500);
    });
  }
}