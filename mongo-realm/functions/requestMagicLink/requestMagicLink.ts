import type { sign } from 'jsonwebtoken';
import { validateEmail } from '../../utility';

interface ISendEmailOptions {
    http: typeof context.http;
    sendingBlueBaseURL: string;
    sendingBlueApiKey: string;
    baseURL: string;
    email: string;
    token: string;
    code: string;
    type: IRequestMagicLinkPayload['type'];
    username?: string;
}
export const sendEmail = async (options: ISendEmailOptions): Promise<any> => {
    const { http, sendingBlueApiKey, sendingBlueBaseURL, code, baseURL, email, token, type, username } = options;
    const body = {
        sender: {
            name: 'Fanzone Media',
            email: 'hi@fanzone.media',
        },
        to: [
            {
                email,
            },
        ],
        templateId: 17,
        replyTo: {
            email: 'hi@fanzone.media',
            name: 'Fanzone Media',
        },
        params: {},
    };

    switch (type) {
        case 'login': {
            body.templateId = 17;
            body.params = { code: code, link: `${baseURL}/magic-login-link-target?token=${token}&email=${email}` };
            break;
        }
        case 'register': {
            body.templateId = 18;
            body.params = {
                code: code,
                link: `${baseURL}/magic-login-link-target?token=${token}&email=${email}&username=${
                    username ? username : 'user'
                }`,
            };
            break;
        }
        default:
            break;
    }

    return await http.post({
        url: `${sendingBlueBaseURL}/email`,
        headers: {
            accept: ['application/json'],
            'api-key': [sendingBlueApiKey],
            'Content-Type': ['application/json'],
        },
        body: JSON.stringify(body),
    });
};

export function validateType(type: string): boolean {
    if (!['register', 'login'].includes(type)) {
        throw new Error(`Invalid Payload: ${type} for parameter 'type'.`);
    }

    return true;
}

export const createRandomNumericString = (length = 6): string =>
    (Math.random() * Math.random() * 999999).toFixed(0).padStart(length, '0');

export const createToken = (signToken: typeof sign) => (secret: string): { token: string; code: string } => {
    // create JWT
    const code = createRandomNumericString(6);
    return {
        token: signToken({ type: 'requestMagicLink', code }, secret, { expiresIn: 60 * 30 }),
        code,
    };
};

interface IRequestMagicLinkPayload {
    email: string;
    username?: string;
    type: 'register' | 'login';
}

const requestMagicLink = async (payload: IRequestMagicLinkPayload): Promise<any> => {
    const { sign } = await import('jsonwebtoken');
    const sendingBlueBaseURL = context.values.get('sendingBlueBaseURL');
    const baseURL = context.values.get('clientBaseURL');
    const jwtSecret = context.values.get('jwtSecretMagicLink');
    const sendingBlueApiKey = context.values.get('sendingBlueApiKey');
    const http = context.services.get('http');
    const userCollection = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    const { email, type, username } = payload;

    validateEmail(email);
    validateType(type);
    const user = await userCollection.findOne({ email });
    const { token, code } = createToken(sign)(jwtSecret);
    if (!user) {
        await userCollection.insertOne({
            email,
            authToken: token,
            accountId: 'toBeUpdated',
            username: '',
            coins: BSON.Decimal128.fromString('10000.0'),
            points: 0,
            securitySetting: 1,
            achievements: [],
            _bookmarkedCard_ids: [],
        });
    } else {
        await userCollection.updateOne({ email }, { $set: { authToken: token } });
    }
    const res = await sendEmail({
        http,
        email,
        token,
        code,
        type,
        username,
        baseURL,
        sendingBlueApiKey,
        sendingBlueBaseURL,
    });
    return res;
};

export default requestMagicLink;
