import { LibraryRoutingModule } from './library-routing.module';

describe('LibraryRoutingModule', () => {
  let libraryRoutingModule: LibraryRoutingModule;

  beforeEach(() => {
    libraryRoutingModule = new LibraryRoutingModule();
  });

  it('Should create an instance', () => {
    expect(libraryRoutingModule).toBeTruthy();
  });
});
