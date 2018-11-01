export interface Environment {
  production: boolean;
  firebase: FirebaseConfig;
  uuid: UUIDConfig;
  googleTagManager: string;
}

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

interface UUIDConfig {
  domain: string;
  namespace: string;
}
