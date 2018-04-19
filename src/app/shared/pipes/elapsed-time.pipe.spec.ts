import { ElapsedTimePipe } from './elapsed-time.pipe';

describe('ElapsedTimePipe', () => {
  let pipe: ElapsedTimePipe;

  beforeEach(() => {
    pipe = new ElapsedTimePipe();
  });

  it('Return 00:00:00 when start is 0', () => {
    const result = pipe.transform(0, 5);
    expect(result).toBe('00:00:00');
  });

  it('Return 00:00:00 when end is 0', () => {
    const result = pipe.transform(5, 0);
    expect(result).toBe('00:00:00');
  });

  it('Returns 00:00:00 when given 0 for both', () => {
    const result = pipe.transform(0, 0);
    expect(result).toBe('00:00:00');
  });

  it('Returns 00:00:00 when end is before start', () => {
    const result = pipe.transform(30, 10);
    expect(result).toBe('00:00:00');
  });

  it('Returns 00:01:00 when given times one minute apart', () => {
    const result = pipe.transform(500, 60500);
    expect(result).toBe('00:01:00');
  });
});
