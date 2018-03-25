import { Environment } from './';

export const environment: Environment = {
  production: false,
  urls: {
    saveTimerInfo: 'http://localhost:3000/timer/save',
    loadHistoryItems: 'http://localhost:3000/history'
  },
  firebase: {
    apiKey: 'AIzaSyDIwtutkMaINN8gaGZmoEjt_fR9_XhDZdY',
    authDomain: 'track-my-playtime.firebaseapp.com',
    databaseURL: 'https://track-my-playtime.firebaseio.com',
    projectId: 'track-my-playtime',
    storageBucket: 'track-my-playtime.appspot.com',
    messagingSenderId: '629658315142'
  }
};
