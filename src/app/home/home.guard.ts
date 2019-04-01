import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../shared/services/user/login/login.service';
import { UserProfileService } from '../shared/services/user/user-profile/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userProfileService: UserProfileService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.loginService.isUserLoggedIn().then(async userLoggedIn => {
        if (!userLoggedIn) {
          console.log('User is not logged in');
          this.router.navigate(['/login']);
          resolve(false);
        }

        let userHasProfile = await this.userProfileService.userHasProfile();
        if (!userHasProfile) {
          console.log('User does not have profile');
          this.router.navigate(['create-account']);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}