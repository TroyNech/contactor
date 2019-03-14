import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeGuard } from './home/home.guard';
import { CreateAccountGuard } from './account-info/create-account/create-account.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [HomeGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'email-login', loadChildren: './login/email-login/email-login.module#EmailLoginPageModule' },
  { path: 'create-account', loadChildren: './account-info/create-account/create-account.module#CreateAccountPageModule', canActivate: [CreateAccountGuard] },
  { path: 'user-detail', loadChildren: './user-detail/user-detail.module#UserDetailPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
