import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountInfoComponent } from './account-info.component';

const routes: Routes = [
  {
    path: '',
    component: AccountInfoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountInfoComponent],
  exports: [AccountInfoComponent]
})
export class AccountInfoComponentModule {}
