import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';

type ColorSetName = 'vivid' | 'natural' | 'cool' | 'fire' |
  'solar' | 'air' | 'aqua' | 'flame' |
  'ocean' | 'forest' | 'horizon' | 'neons' |
  'picnic' | 'night' | 'nightLights';

export const selectColorScheme = (name: ColorSetName): string[] => {
  const selectedSet = colorSets.find(set => set.name === name);
  return selectedSet ? selectedSet.domain : ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
};
