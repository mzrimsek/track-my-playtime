import { CompletionModule } from './completion.module';

describe('CompletionModule', () => {
  let completionModule: CompletionModule;

  beforeEach(() => {
    completionModule = new CompletionModule();
  });

  it('Should create an instance', () => {
    expect(completionModule).toBeTruthy();
  });
});
