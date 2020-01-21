import { getUUID } from './uuid.utils';

const generateUUIDs = (userId: string, amountToGenerate: number): string[] => {
  const ids: number[] = new Array(amountToGenerate);
  return ids.map(i => getUUID(userId, i));
};

describe('UUID Utils', () => {
  it('Can generate 1,000,000 unique IDs for a user', () => {
    const userId = 'myUserID';
    const ids = generateUUIDs(userId, 1000000);

    const result = getUUID(userId);

    expect(ids.indexOf(result)).toBe(-1);
  });
});
