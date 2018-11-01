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

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './features/auth/auth.module';
import { CompletionModule } from './features/completion/completion.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { HomeModule } from './features/home/home.module';
import { LibraryModule } from './features/library/library.module';
import { ProfileModule } from './features/profile/profile.module';
import { TrackerModule } from './features/tracker/tracker.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';

import { ElapsedTimeService } from './shared/services/elapsed-time.service';

import { AuthGuard } from './features/auth/guards/auth.guard';

import { metaReducers } from './meta.reducers';
import { CustomRouterStateSerializer, reducers } from './reducers/root.reducer';

import { environment } from '../environments/environment';

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
    AuthModule,
    SharedModule,
    Angulartics2Module.forRoot([Angulartics2GoogleTagManager]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    HomeModule,
    TrackerModule,
    DashboardModule,
    LibraryModule,
    CompletionModule,
    ProfileModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    AuthGuard,
    ElapsedTimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
