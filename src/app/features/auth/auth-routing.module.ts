import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { NgModule } from '../../../../node_modules/@angular/core';

const routes: Routes = [{
  path: 'forgotPassword',
  component: ForgotPasswordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
