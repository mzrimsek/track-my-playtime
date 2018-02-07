import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { reducers } from './reducers';
import { environment } from '../environments/environment';

let imports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot([])
];

if (!environment.production) {
  imports = [...imports, StoreDevtoolsModule.instrument()];
}

export default imports;
