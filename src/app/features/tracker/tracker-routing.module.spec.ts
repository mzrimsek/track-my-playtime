import { TrackerRoutingModule } from './tracker-routing.module';

describe('TrackerRoutingModule', () => {
  let trackerRoutingModule: TrackerRoutingModule;

  beforeEach(() => {
    trackerRoutingModule = new TrackerRoutingModule();
  });

  it('Should create an instance', () => {
    expect(trackerRoutingModule).toBeTruthy();
  });
});
