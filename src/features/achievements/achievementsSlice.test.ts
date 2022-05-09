import { unwrapResult } from '@reduxjs/toolkit';
import { Credentials } from 'realm-web';
import { realm, store } from 'src/test-utils';
import { fetchAllAchievements } from './achievementsSlice';

describe('achievementSlice #redux', () => {
    beforeAll(async () => {
        const anonCred = Credentials.anonymous();
        await realm.logIn(anonCred);
    });

    describe('fetchAllAchievements', () => {
        it('should return array of achievements for anon-user', async () => {
            return store
                .dispatch(fetchAllAchievements())
                .then(unwrapResult)
                .then((res) => {
                    expect(Array.isArray(res)).toBe(true);
                    expect(res[0]).toHaveProperty('_id');
                    expect(res[0]).toHaveProperty('prize');
                    expect(res[0]).toHaveProperty('title');
                    expect(res[0]).toHaveProperty('type');
                });
        });
    });
});
