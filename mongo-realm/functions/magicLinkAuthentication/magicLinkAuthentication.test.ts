import { sign, verify } from 'jsonwebtoken';
import { findUser, validateToken } from './magicLinkAuthentication';

describe('magicLinkAuthentication #realm', () => {
    describe('validateToken', () => {
        it('should throw error if JWT is invalid', () => {
            const invalidJWT = 'invalidJWT';
            const jwtSecret = 'secret';
            expect(() => validateToken(verify)(invalidJWT, jwtSecret)).toThrowError(
                `Invalid Payload: ${invalidJWT} is not a valid JWT.`,
            );
        });

        it('should throw error if JWT is expired', () => {
            const jwtSecret = 'secret';
            const expiredJWT = sign({ type: 'requestMagicLink' }, jwtSecret, { expiresIn: 0 });
            expect(() => validateToken(verify)(expiredJWT, jwtSecret)).toThrowError(
                `Invalid Payload: ${expiredJWT} is not a valid JWT.`,
            );
        });

        it('should return verified JWT if valid', () => {
            const jwtSecret = 'secret';
            const expiredJWT = sign({ type: 'requestMagicLink' }, jwtSecret, { expiresIn: 1000 });
            expect(validateToken(verify)(expiredJWT, jwtSecret)).toHaveProperty('type', 'requestMagicLink');
        });
    });

    describe('findOrCreateUser', () => {
        it('should return { id, name } if user with this email exists', async () => {
            const payload = {
                email: 'existing@email',
            };
            const users = {
                findOne: () => ({
                    _id: 'userId',
                    username: 'username',
                }),
            };
            const result = await findUser(payload, users as any);
            expect(result).toEqual({ id: 'userId', name: 'username' });
        });

        it('should throw error if user does not exist AND no username is provided', async () => {
            const payload = {
                email: 'existing@email',
            };
            const users = {
                findOne: () => null,
            };

            await expect(findUser(payload, users as any)).rejects.toThrowError(
                `Invalid Payload: ${String(undefined)} for parameter 'username'.`,
            );
        });

        it('should return { id, name } user does not exist AND username is provided', async () => {
            const payload = {
                email: 'existing@email',
                username: 'username',
            };
            const users = {
                findOne: () => null,
                insertOne: () => ({
                    insertedId: 'insertedId',
                    username: payload.username,
                }),
            };
            const result = await findUser(payload, users as any);
            expect(result.id).toEqual('insertedId');
            expect(result.name).toEqual('username');
        });
    });
});
