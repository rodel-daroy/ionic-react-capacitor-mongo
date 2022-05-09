import { validateEmail } from '.';

describe('validateEmail', () => {
    it('should throw error if email is invalid', () => {
        const invalidEmail = 'not-an-email';
        expect(() => validateEmail(invalidEmail)).toThrowError(
            `Invalid Payload: ${invalidEmail} for parameter 'email'.`,
        );
    });

    it('should return true if email is valid', () => {
        const validEmail = 'valid@email.com';
        expect(validateEmail(validEmail)).toBe(true);
    });
});
