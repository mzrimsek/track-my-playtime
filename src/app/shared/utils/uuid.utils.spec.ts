import { getUUID } from './uuid.utils';

const USER_ID = 'myUserID';

describe('UUID Utils', () => {
  it('Can generate 500,000 unique IDs for a user', () => {
    const ids = generateUUIDs(500000);
    const result = getUUID(USER_ID);
    expect(ids.indexOf(result)).toBe(-1);
  });
});

const generateUUIDs = (amountToGenerate: number): string[] => {
  let ids: string[] = [];
  for (let i = 0; i < amountToGenerate; i++) {
    // getUUID seeds value based on the current time
    // waiting 1 millisecond before generating a UUID
    setTimeout(() => {
      const id = getUUID(USER_ID);
      ids = [...ids, id];
    }, 1);
  }
  return ids;
};
