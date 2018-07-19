import { SharedModule } from './shared.module';

describe('SharedModule', () => {
  let sharedModule: SharedModule;

  beforeEach(() => {
    sharedModule = new SharedModule();
  });

  it('Should create an instance', () => {
    expect(sharedModule).toBeTruthy();
  });
});
