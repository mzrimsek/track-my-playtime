import { TimePipe } from './time.pipe';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

describe('TimePipe', () => {
  let pipe: TimePipe;

  beforeEach(() => {
    pipe = new TimePipe();
  });

  it('Returns 00:00:01 for one second', () => {
    const result = pipe.transform(1);
    expect(result).toBe('00:00:01');
  });

  it('Returns 00:01:00 for one minute', () => {
    const result = pipe.transform(MINUTE);
    expect(result).toBe('00:01:00');
  });

  it('Returns 01:00:00 for one hour', () => {
    const result = pipe.transform(HOUR);
    expect(result).toBe('01:00:00');
  });

  it('Return 24:00:00 for one day', () => {
    const result = pipe.transform(DAY);
    expect(result).toBe('24:00:00');
  });

  it('Returns 26:46:05 for large time', () => {
    const time = DAY + (HOUR * 2) + (MINUTE * 45) + 65;
    const result = pipe.transform(time);
    expect(result).toBe('26:46:05');
  });
});
