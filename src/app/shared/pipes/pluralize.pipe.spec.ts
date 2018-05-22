import { PluralizePipe } from './pluralize.pipe';

describe('PluralizePipe', () => {
  let pipe: PluralizePipe;
  const singularWord = 'game';
  const pluralWord = 'games';

  beforeEach(() => {
    pipe = new PluralizePipe();
  });

  it('Should return singular word when value is 1', () => {
    const result = pipe.transform(1, singularWord, pluralWord);
    expect(result).toBe(singularWord);
  });

  it('Should return plural word when value is 0', () => {
    const result = pipe.transform(0, singularWord, pluralWord);
    expect(result).toBe(pluralWord);
  });

  it('Should return plural word when value is greater than 1', () => {
    const result = pipe.transform(2, singularWord, pluralWord);
    expect(result).toBe(pluralWord);
  });
});
