import { Provider, User } from '../../auth/models';
import { Profile } from '../models';

export const DEFAULT_USER_IMGSRC = '../../../assets/user.png';
export const DEFAULT_DISPLAYNAME = 'New User';
export const getDisplayName = (user: User, profile: Profile): string => {
  const defaultName = user.email ? user.email.split('@')[0] : DEFAULT_DISPLAYNAME;
  return profile.displayName ? profile.displayName : user.displayName ? user.displayName : defaultName;
};

export const getImgSrc = (user: User): string => {
  const provider = getProviderFrom(user.providerId);
  switch (provider) {
    case 'FACEBOOK': {
      return `${user.photoURL}?type=large`;
    }
    case 'TWITTER': {
      return user.photoURL.replace('_normal', '');
    }
  }
  return user.photoURL ? user.photoURL : DEFAULT_USER_IMGSRC;
};

export const getEmail = (user: User): string => {
  return user.email ? user.email : 'N/A';
};

const providerMap = new Map<string, Provider>([
  ['password', 'PASSWORD'],
  ['google.com', 'GOOGLE'],
  ['facebook.com', 'FACEBOOK'],
  ['twitter.com', 'TWITTER']
]);

export const getProviderFrom = (providerId: string): Provider => {
  const providerExists = providerId && providerMap.has(providerId);
  if (!providerExists) {
    return '';
  }
  const provider = providerMap.get(providerId);
  return provider ? provider : '';
};
