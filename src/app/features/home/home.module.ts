import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';

import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
