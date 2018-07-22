import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  let authModule: AuthModule;

  beforeEach(() => {
    authModule = new AuthModule();
  });

  it('Should create an instance', () => {
    expect(authModule).toBeTruthy();
  });
});
