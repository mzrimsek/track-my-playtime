import { CompletionRoutingModule } from './completion-routing.module';

describe('CompletionRoutingModule', () => {
  let completionRoutingModule: CompletionRoutingModule;

  beforeEach(() => {
    completionRoutingModule = new CompletionRoutingModule();
  });

  it('Should create an instance', () => {
    expect(completionRoutingModule).toBeTruthy();
  });
});
