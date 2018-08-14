import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AdsenseModule } from 'ng2-adsense';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './features/auth/auth.module';
import { CompletionModule } from './features/completion/completion.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { HomeModule } from './features/home/home.module';
import { LibraryModule } from './features/library/library.module';
import { TrackerModule } from './features/tracker/tracker.module';
import { UserModule } from './features/user/user.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';

import { AuthGuard } from './features/auth/guards/auth.guard';

import { CustomRouterStateSerializer, reducers } from './reducers/root.reducer';

import { environment } from '../environments/environment';
import './rxjs-operators';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    Angulartics2Module.forRoot([Angulartics2GoogleTagManager]),
    AngularFireModule.initializeApp(environment.firebase),
    AdsenseModule.forRoot({
      adClient: environment.adsense.client,
      adSlot: environment.adsense.navAdSlot
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    HomeModule,
    AuthModule,
    TrackerModule,
    DashboardModule,
    LibraryModule,
    CompletionModule,
    UserModule
  ],
  providers: [{
    provide: RouterStateSerializer, useClass: CustomRouterStateSerializer
  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
