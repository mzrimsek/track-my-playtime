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
      document.head.insertAdjacentElement('afterbegin', this.getGoogleTagManagerScriptTag());
      document.body.insertAdjacentElement('afterbegin', this.getGoogleTagManagerNoScriptTag());
    } catch (err) {
      this.store.dispatch(new actions.Error('Append Google Tag Manager Scripts', err.message));
    }
  }

  private getGoogleTagManagerNoScriptTag(): HTMLElement {
    const noScriptEl = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${environment.googleTagManager}`;
    iframe.height = '0';
    iframe.width = '0';
    noScriptEl.appendChild(iframe);
    return noScriptEl;
  }

  private getGoogleTagManagerScriptTag(): HTMLScriptElement {
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', '${environment.googleTagManager}');
      `;
    return configScript;
  }
}
