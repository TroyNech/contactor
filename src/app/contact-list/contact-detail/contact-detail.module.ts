import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactDetailPage } from './contact-detail.page';
import { ContactDataComponentModule } from '../../account-info/contact-data/contact-data.module';

const routes: Routes = [
  {
    path: '',
    component: ContactDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ContactDataComponentModule
  ],
  declarations: [ContactDetailPage]
})
export class ContactDetailPageModule {}
