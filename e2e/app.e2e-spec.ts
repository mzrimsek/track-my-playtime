import { AppPage } from './app.po';

describe('track-my-playtime App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display tagline message', () => {
    page.navigateTo();
    expect(page.getTaglineMessage()).toEqual('GAME TIME TRACKING MADE SIMPLE');
  });
});
