import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoginService } from '../shared/services/user/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loading: HTMLIonLoadingElement;

  constructor(
    public loadingCtrl: LoadingController,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  async googleLogin() {
    this.loginService.googleLogin().then(user => {
      this.router.navigateByUrl('home');
    })
      .catch(err => console.error(err));
  }
}
