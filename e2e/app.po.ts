import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTaglineMessage() {
    return element(by.css('app-root app-home .home .tagline')).getText();
  }
}
