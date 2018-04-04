import { Environment } from './';

export const environment: Environment = {
  production: false,
  urls: {},
  firebase: {
    apiKey: 'AIzaSyC7TgYwuaFYPwVNjXOafTA97Eq8IRuRu6g',
    authDomain: 'track-my-playtime-dev.firebaseapp.com',
    databaseURL: 'https://track-my-playtime-dev.firebaseio.com',
    projectId: 'track-my-playtime-dev',
    storageBucket: 'track-my-playtime-dev.appspot.com',
    messagingSenderId: '448851574644'
  },
  uuid: {
    domain: 'https://track-my-playtime-dev.firebaseapp.com/',
    namespace: 'b057090a-0931-5b05-8772-94eb3b9b0550'
  },
  googleAnalytics: 'UA-41212245-9'
};
