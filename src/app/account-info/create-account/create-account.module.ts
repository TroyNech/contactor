import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPage } from './create-account.page';
import { AccountInfoComponentModule } from '../account-info.module';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountPage
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
  declarations: [CreateAccountPage]
})
export class CreateAccountPageModule {}
