import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as actions from './actions/app.actions';

import { State } from './reducers/root.reducer';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private store: Store<State>, private router: Router) {
    this.store.dispatch(new actions.InitializeApplication());
    this.appendGTagScripts();
  }

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.indexOf('/app') === -1;
  }

  private appendGTagScripts() {
    try {
      document.head.appendChild(this.getGoogleTagManagerSourceScript());
      document.head.appendChild(this.getGoogleTagManagerConfigScript());
    } catch (err) {
      this.store.dispatch(new actions.Error('Append Google Tag Manager Scripts', err.message));
    }
  }

  private getGoogleTagManagerSourceScript(): HTMLScriptElement {
    const sourceUrl = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalytics}`;
    const sourceScript = document.createElement('script');
    sourceScript.async = true;
    sourceScript.src = sourceUrl;
    return sourceScript;
  }

  private getGoogleTagManagerConfigScript(): HTMLScriptElement {
    const configScript = document.createElement('script');
    configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${environment.googleAnalytics}');
      `;
    return configScript;
  }
}
