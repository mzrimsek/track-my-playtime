export interface Environment {
  production: boolean;
  urls: {};
  firebase: FirebaseConfig;
  uuid: {
    domain: string;
    namespace: string;
  };
  googleAnalytics: string;
}

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}
