import { DEFAULT_COLOR_SCHEME, selectColorScheme } from './colorScheme.utils';

describe('Color Scheme Utils', () => {
  describe('selectColorScheme', () => {
    it('Should return the default color scheme when given "default"', () => {
      const result = selectColorScheme('default');
      expect(result).toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "vivid"', () => {
      const result = selectColorScheme('vivid');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "natural"', () => {
      const result = selectColorScheme('natural');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "cool"', () => {
      const result = selectColorScheme('cool');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "fire"', () => {
      const result = selectColorScheme('fire');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "solar"', () => {
      const result = selectColorScheme('solar');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "air"', () => {
      const result = selectColorScheme('air');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "aqua"', () => {
      const result = selectColorScheme('aqua');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "flame"', () => {
      const result = selectColorScheme('flame');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "ocean"', () => {
      const result = selectColorScheme('ocean');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "forest"', () => {
      const result = selectColorScheme('forest');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "horizon"', () => {
      const result = selectColorScheme('horizon');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "neons"', () => {
      const result = selectColorScheme('neons');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "picnic"', () => {
      const result = selectColorScheme('night');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });

    it('Should return not the default color scheme when given "nightLights"', () => {
      const result = selectColorScheme('nightLights');
      expect(result).not.toEqual(DEFAULT_COLOR_SCHEME);
    });
  });
});
