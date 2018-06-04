import { AppModule } from './app.module';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(() => {
    appModule = new AppModule();
  });

  it('Should create an instance', () => {
    expect(appModule).toBeTruthy();
  });
});
