import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactListPage } from './contact-list.page';
//import { ContactDetailPageModule } from './contact-detail/contact-detail.module';

const routes: Routes = [
  {
    path: '',
    component: ContactListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
 //   ContactDetailPageModule
  ],
  declarations: [ContactListPage]
})
export class ContactListPageModule {}
