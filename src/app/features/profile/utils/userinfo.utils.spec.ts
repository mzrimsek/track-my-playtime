import { user } from 'app/test-helpers';

import { User } from 'features/auth/models';
import { Profile } from 'features/profile/models';

import {
    DEFAULT_DISPLAYNAME, DEFAULT_USER_IMGSRC, getDisplayName, getEmail, getImgSrc, getProviderFrom
} from './userinfo.utils';

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

    it('Should return "New User" when no profile display name, user display name, or email', () => {
      const currentUser: User = {
        ...user.mockUser,
        displayName: '',
        email: ''
      };
      const profile: Profile = {
        displayName: ''
      };

      const result = getDisplayName(currentUser, profile);

      expect(result).toBe(DEFAULT_DISPLAYNAME);
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

    it('Should return modified photo url when provider is Facebook', () => {
      const currentUser: User = {
        ...user.mockUser,
        providerId: 'facebook.com'
      };
      const result = getImgSrc(currentUser);
      expect(result).toBe(`${user.mockUser.photoURL}?type=large`);
    });

    it('Should return modified photo url when provider is Twitter', () => {
      const currentUser: User = {
        ...user.mockUser,
        providerId: 'twitter.com',
        photoURL: 'something_normal.png'
      };
      const result = getImgSrc(currentUser);
      expect(result).toBe('something.png');
    });
  });

  describe('getEmail', () => {
    it('Should return user email when email is present', () => {
      const result = getEmail(user.mockUser);
      expect(result).toBe(user.mockUser.email);
    });

    it('Should return "N/A" when no user email present', () => {
      const currentUser: User = {
        ...user.mockUser,
        email: ''
      };
      const result = getEmail(currentUser);
      expect(result).toBe('N/A');
    });
  });

  describe('getProviderFrom', () => {
    it('Should return empty string when given empty string', () => {
      const providerId = '';
      const result = getProviderFrom(providerId);
      expect(result).toBe('');
    });

    it('Should return empty string when given an invalid provider', () => {
      const providerId = 'reddit.com';
      const result = getProviderFrom(providerId);
      expect(result).toBe('');
    });

    it('Should return PASSWORD when given password', () => {
      const providerId = 'password';
      const result = getProviderFrom(providerId);
      expect(result).toBe('PASSWORD');
    });

    it('Should return GOOGLE when given google.com', () => {
      const providerId = 'google.com';
      const result = getProviderFrom(providerId);
      expect(result).toBe('GOOGLE');
    });

    it('Should return FACEBOOK when given facebook.com', () => {
      const providerId = 'facebook.com';
      const result = getProviderFrom(providerId);
      expect(result).toBe('FACEBOOK');
    });

    it('Should return TWITTER when given twitter.com', () => {
      const providerId = 'twitter.com';
      const result = getProviderFrom(providerId);
      expect(result).toBe('TWITTER');
    });
  });
});
