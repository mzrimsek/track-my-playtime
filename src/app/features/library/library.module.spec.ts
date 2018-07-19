import { LibraryModule } from './library.module';

describe('LibraryModule', () => {
  let libraryModule: LibraryModule;

  beforeEach(() => {
    libraryModule = new LibraryModule();
  });

  it('Should create an instance', () => {
    expect(libraryModule).toBeTruthy();
  });
});
