import { environment } from '../../environments/environment';

export const getGoogleTagManagerNoScriptTag = (): HTMLElement => {
  const noScriptEl = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${environment.googleTagManager}`;
  iframe.height = '0';
  iframe.width = '0';
  noScriptEl.appendChild(iframe);
  return noScriptEl;
};

export const getGoogleTagManagerScriptTag = (): HTMLScriptElement => {
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
};
