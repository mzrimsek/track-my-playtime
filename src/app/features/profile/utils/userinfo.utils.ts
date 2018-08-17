import { User } from '../../auth/models';
import { Profile } from '../models';

export const DEFAULT_USER_IMGSRC = '../../../assets/user.png';
export const getDisplayName = (user: User, profile: Profile): string => {
  const defaultName = user.email.split('@')[0];
  return profile.displayName ? profile.displayName : user.displayName ? user.displayName : defaultName;
};

export const getImgSrc = (user: User): string => {
  return user.photoURL ? user.photoURL : DEFAULT_USER_IMGSRC;
};
