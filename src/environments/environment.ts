import { Environment } from './';

export const environment: Environment = {
  production: false,
  urls: {
    loadPlatforms: 'http://localhost:3000/platforms',
    saveTimerInfo: 'http://localhost:3000/timer/save'
  }
};
