import { ProfileRoutingModule } from './profile-routing.module';

describe('ProfileRoutingModule', () => {
  let profileRoutingModule: ProfileRoutingModule;

  beforeEach(() => {
    profileRoutingModule = new ProfileRoutingModule();
  });

  it('Should create an instance', () => {
    expect(profileRoutingModule).toBeTruthy();
  });
});
