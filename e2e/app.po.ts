import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getWelcomeMessage() {
    return element(by.css('app-root app-home .home .tagline')).getText();
  }
}
