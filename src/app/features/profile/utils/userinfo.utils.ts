import { Provider, User } from '../../auth/models';
import { Profile } from '../models';

export const DEFAULT_USER_IMGSRC = '../../../assets/user.png';
export const getDisplayName = (user: User, profile: Profile): string => {
  const defaultName = user.email.split('@')[0];
  return profile.displayName ? profile.displayName : user.displayName ? user.displayName : defaultName;
};

export const getImgSrc = (user: User): string => {
  const provider = getProviderFrom(user.providerId);
  if (provider === 'FACEBOOK') {
    user.photoURL = `${user.photoURL}?type=large`;
  }
  return user.photoURL ? user.photoURL : DEFAULT_USER_IMGSRC;
};

const providerMap = new Map<string, Provider>([
  ['password', 'PASSWORD'],
  ['google.com', 'GOOGLE'],
  ['facebook.com', 'FACEBOOK']
]);

export const getProviderFrom = (providerId: string): Provider => {
  const providerExists = providerId && providerMap.has(providerId);
  if (!providerExists) {
    return '';
  }
  const provider = providerMap.get(providerId);
  return provider ? provider : '';
};
