import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { TrackerModule } from './features/tracker/tracker.module';
import { HomeModule } from './features/home/home.module';
import { AuthModule } from './features/auth/auth.module';

import { reducers } from './reducers/root.reducer';
import { environment } from '../environments/environment';

const imports = [
  BrowserModule,
  AppRoutingModule,
  SharedModule,
  HttpClientModule,
  StoreModule.forRoot(reducers),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  EffectsModule.forRoot([]),
  TrackerModule,
  HomeModule,
  AuthModule
];

export default imports;
