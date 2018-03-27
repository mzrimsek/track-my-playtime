import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthModule } from '../auth/auth.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
