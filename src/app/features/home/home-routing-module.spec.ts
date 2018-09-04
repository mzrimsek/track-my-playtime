import { HomeRoutingModule } from './home-routing.module';

describe('HomeRoutingModule', () => {
  let homeRoutingModule: HomeRoutingModule;

  beforeEach(() => {
    homeRoutingModule = new HomeRoutingModule();
  });

  it('Should create an instance', () => {
    expect(homeRoutingModule).toBeTruthy();
  });
});
