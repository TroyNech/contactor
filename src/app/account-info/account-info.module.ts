import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountInfoComponent } from './account-info.component';
import { ContactDataComponentModule } from './contact-data/contact-data.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContactDataComponentModule
  ],
  declarations: [AccountInfoComponent],
  exports: [AccountInfoComponent]
})
export class AccountInfoComponentModule {}
