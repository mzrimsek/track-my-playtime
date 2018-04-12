import { getUUID } from './uuid.utils';

describe('UUID Utils', () => {
  it('Can generate 50,000 unique IDs for a user', async () => {
    const userId = 'myUserID';
    const ids = await generateUUIDs(userId, 50000);

    const result = getUUID(userId);

    expect(ids.indexOf(result)).toBe(-1);
  });
});

const generateUUIDs = (userId: string, amountToGenerate: number): Promise<string[]> => {
  return new Promise((resolve) => {
    let ids: string[] = [];
    for (let i = 0; i < amountToGenerate; i++) {
      // getUUID seeds value based on the current time
      // waiting 1 millisecond before generating a UUID
      setTimeout(() => {
        const id = getUUID(userId);
        ids = [...ids, id];
      }, 1);
    }
    resolve(ids);
  });
};
