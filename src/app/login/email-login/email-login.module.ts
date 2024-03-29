import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EmailLoginPage } from './email-login.page';
import { ResetPasswordComponent } from './reset-password/reset-password.component'

const routes: Routes = [
  {
    path: '',
    component: EmailLoginPage
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
  declarations: [EmailLoginPage, ResetPasswordComponent]
})
export class EmailLoginPageModule {}
