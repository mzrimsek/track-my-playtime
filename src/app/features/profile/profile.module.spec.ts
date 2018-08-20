import { ProfileModule } from './profile.module';

describe('ProfileModule', () => {
  let userModule: ProfileModule;

  beforeEach(() => {
    userModule = new ProfileModule();
  });

  it('should create an instance', () => {
    expect(userModule).toBeTruthy();
  });
});
