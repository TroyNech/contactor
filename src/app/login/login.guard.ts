import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../shared/services/user/login/login.service';
import { UserProfileService } from '../shared/services/user/user-profile/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userProfileService: UserProfileService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.loginService.isUserLoggedIn().then(async userLoggedIn => {
        if (userLoggedIn) {
          console.log('User already logged in');
          this.router.navigate(['/home']);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}