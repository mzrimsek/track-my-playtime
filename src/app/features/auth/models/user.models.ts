export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
}

export interface UserInfo {
  displayName: string;
  email: string;
  imgSrc: string;
  provider: Provider;
}

export type Provider = '' | 'PASSWORD' | 'GOOGLE' | 'FACEBOOK';
