import { HomeModule } from './home.module';

describe('HomeModule', () => {
  let homeModule: HomeModule;

  beforeEach(() => {
    homeModule = new HomeModule();
  });

  it('Should create an instance', () => {
    expect(homeModule).toBeTruthy();
  });
});
