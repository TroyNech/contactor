import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UserDetailPage } from './user-detail.page';
import { AccountInfoComponentModule } from '../account-info/account-info.module';

const routes: Routes = [
  {
    path: '',
    component: UserDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AccountInfoComponentModule
  ],
  declarations: [UserDetailPage]
})
export class UserDetailPageModule {}
