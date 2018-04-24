export interface Environment {
  production: boolean;
  urls: {};
  firebase: FirebaseConfig;
  uuid: {
    domain: string;
    namespace: string;
  };
  googleTagManager: string;
  adsense: {
    client: string;
    navAdSlot: string;
  };
}

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}
