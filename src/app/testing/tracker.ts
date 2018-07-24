export namespace tracker {
  export const clockServiceStub = {
    getCurrentTime: jasmine.createSpy('getCurrentTime')
  };

  export const timerServiceStub = {
    setTimer: jasmine.createSpy('setTimer'),
    setGame: jasmine.createSpy('setGame'),
    setPlatform: jasmine.createSpy('setPlatform'),
    setStartTime: jasmine.createSpy('setStartTime'),
    resetTimer: jasmine.createSpy('resetTimer')
  };
}
