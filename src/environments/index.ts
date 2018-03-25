export interface Environment {
  production: boolean;
  urls: {
    saveTimerInfo: string;
    loadHistoryItems: string;
  };
  firebase: FirebaseConfig;
}

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}
