import { AuthRoutingModule } from './auth-routing.module';

describe('AppRoutingModule', () => {
  let authRoutingModule: AuthRoutingModule;

  beforeEach(() => {
    authRoutingModule = new AuthRoutingModule();
  });

  it('Should create an instance', () => {
    expect(authRoutingModule).toBeTruthy();
  });
});
