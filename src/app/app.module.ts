import './rxjs-operators';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { HomeModule } from './features/home/home.module';
import { TrackerAppModule } from './features/tracker-app/tracker-app.module';

import { reducers } from './reducers/root.reducer';

import { environment } from '../environments/environment';
import { CustomRouterStateSerializer } from './shared/utils/router.utils';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    HomeModule,
    TrackerAppModule
  ],
  providers: [{
    provide: RouterStateSerializer, useClass: CustomRouterStateSerializer
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
