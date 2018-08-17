import { User } from '../../auth/models';
import { Profile } from '../models';

import { DEFAULT_USER_IMGSRC, getDisplayName, getImgSrc } from './userinfo.utils';

import { user } from '../../../test-helpers';

describe('User Info Utils', () => {
  describe('getDisplayName', () => {
    it('Should return start of user email address when no profile display name or user display name', () => {
      const defaultName = user.mockUser.email.split('@')[0];
      const currentUser: User = {
        ...user.mockUser,
        displayName: ''
      };
      const profile: Profile = {
        displayName: ''
      };

      const result = getDisplayName(currentUser, profile);

      expect(result).toBe(defaultName);
    });

    it('Should return user display name when there is a user display name and no profile display name', () => {
      const profile: Profile = {
        displayName: ''
      };
      const result = getDisplayName(user.mockUser, profile);
      expect(result).toBe(user.mockUser.displayName);
    });

    it('Should return profile display name when there is a profile display name and no user display name', () => {
      const currentUser: User = {
        ...user.mockUser,
        displayName: ''
      };
      const profile: Profile = {
        displayName: 'profile name'
      };

      const result = getDisplayName(currentUser, profile);

      expect(result).toBe('profile name');
    });

    it('Should return profile display name when there is a profile display name and a user display name', () => {
      const profile: Profile = {
        displayName: 'profile name'
      };
      const result = getDisplayName(user.mockUser, profile);
      expect(result).toBe('profile name');
    });
  });

  describe('getImgSrc', () => {
    it('Should return default image when no user photo', () => {
      const currentUser: User = {
        ...user.mockUser,
        photoURL: ''
      };
      const result = getImgSrc(currentUser);
      expect(result).toBe(DEFAULT_USER_IMGSRC);
    });

    it('Should return user photo url when there is a user photo', () => {
      const currentUser: User = {
        ...user.mockUser,
        photoURL: 'img.png'
      };
      const result = getImgSrc(currentUser);
      expect(result).toBe('img.png');
    });
  });
});
