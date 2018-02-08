import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { TrackerModule } from './features/tracker/tracker.module';

import { reducers } from './reducers';
import { environment } from '../environments/environment';

const imports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  StoreModule.forRoot(reducers),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  EffectsModule.forRoot([]),
  TrackerModule
];

export default imports;
