export interface Environment {
  production: boolean;
  urls: {};
  firebase: FirebaseConfig;
  domain: string;
}

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}
