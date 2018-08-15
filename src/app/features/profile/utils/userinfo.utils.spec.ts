import { User } from '../../auth/models';
import { Profile } from '../models';

import { DEFAULT_USER_IMGSRC, getDisplayName, getImgSrc } from './userinfo.utils';

describe('User Info Utils', () => {
  describe('getDisplayName', () => {
    it('Should return "New User" when no profile display name or user display name', () => {
      const user: User = {
        uid: 'some id',
        displayName: '',
        email: 'email@email.com',
        photoURL: ''
      };
      const profile: Profile = {
        displayName: ''
      };

      const result = getDisplayName(user, profile);

      expect(result).toBe('New User');
    });

    it('Should return user display name when there is a user display name and no profile display name', () => {
      const user: User = {
        uid: 'some id',
        displayName: 'user name',
        email: 'email@email.com',
        photoURL: ''
      };
      const profile: Profile = {
        displayName: ''
      };

      const result = getDisplayName(user, profile);

      expect(result).toBe('user name');
    });

    it('Should return profile display name when there is a profile display name and no user display name', () => {
      const user: User = {
        uid: 'some id',
        displayName: '',
        email: 'email@email.com',
        photoURL: ''
      };
      const profile: Profile = {
        displayName: 'profile name'
      };

      const result = getDisplayName(user, profile);

      expect(result).toBe('profile name');
    });

    it('Should return profile display name when there is a profile display name and a user display name', () => {
      const user: User = {
        uid: 'some id',
        displayName: 'user name',
        email: 'email@email.com',
        photoURL: ''
      };
      const profile: Profile = {
        displayName: 'profile name'
      };

      const result = getDisplayName(user, profile);

      expect(result).toBe('profile name');
    });
  });

  describe('getImgSrc', () => {
    it('Should return default image when no user photo', () => {
      const user: User = {
        uid: 'some uid',
        displayName: 'user name',
        email: 'email@email.com',
        photoURL: ''
      };
      const result = getImgSrc(user);
      expect(result).toBe(DEFAULT_USER_IMGSRC);
    });

    it('Should return user photo url when there is a user photo', () => {
      const user: User = {
        uid: 'some uid',
        displayName: 'user name',
        email: 'email@email.com',
        photoURL: 'img.png'
      };
      const result = getImgSrc(user);
      expect(result).toBe('img.png');
    });
  });
});
