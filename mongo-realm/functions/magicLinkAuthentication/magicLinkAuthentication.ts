import type { Collection } from 'mongodb';
import JWT from 'jsonwebtoken';
import { Schemas } from '../schema-shims';
import { validateEmail } from '../../utility';

interface IRequestMagicLinkToken {
    type: 'requestMagicLink';
    email: string;
    code: string;
}
export const validateToken = (verify: typeof JWT.verify) => (
    token: string,
    jwtSecret: string,
): IRequestMagicLinkToken => {
    return verify(token, jwtSecret) as IRequestMagicLinkToken;
};

interface IFindOrCreateOnePayload {
    email: string;
    username?: string;
}

export const findUser = async (
    payload: IFindOrCreateOnePayload,
    users: Collection<Schemas['User']>,
): Promise<{ [key: string]: any }> => {
    const { email, username } = payload;
    const user = await users.findOne({ email });
    if (!user) {
        throw new Error('User not found.');
    }
    if (username) {
        const updatedUser = await users.findOneAndUpdate({ email }, { $set: { username } });
        return { id: user._id.toString(), name: updatedUser.value?.username };
    }
    return { id: user._id.toString(), name: user.username };
};

interface IValidateCodePayload {
    code: string;
    email: string;
    jwtSecret: string;
}
export const validateCode = async (
    payload: IValidateCodePayload,
    users: Collection<Schemas['User']>,
    verify: typeof JWT.verify,
): Promise<void> => {
    const { email, code, jwtSecret } = payload;
    const user = await users.findOne({ email });
    if (!user) {
        throw new Error('User with this E-Mail not found.');
    }
    if (!user.authToken) {
        throw new Error('No authentication token found. Request login first!');
    }
    const userToken = validateToken(verify)(user.authToken, jwtSecret);
    if (code !== userToken.code) {
        throw new Error(`Invalid authentication code provided.`);
    }
};

interface IMagicLinkAuthenticationPayload {
    email: string;
    token?: string;
    code?: string;
    username?: string;
}

const magicLinkAuthentication = async (payload: IMagicLinkAuthenticationPayload): Promise<any> => {
    const { verify } = await import('jsonwebtoken');
    const jwtSecret = context.values.get('jwtSecretMagicLink');
    const userCollection = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    const { email, code, token, username } = payload;

    if (token) {
        validateToken(verify)(token, jwtSecret);
        validateEmail(email);
        return findUser({ email, username }, userCollection);
    }
    if (code) {
        validateEmail(email);
        await validateCode({ code, email, jwtSecret }, userCollection, verify);
        return findUser({ email, username }, userCollection);
    }
};

export default magicLinkAuthentication;
