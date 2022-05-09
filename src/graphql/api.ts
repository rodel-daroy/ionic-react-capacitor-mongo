import { ApolloClient } from '@apollo/client';
import { Query } from './createQuery';
import { cardApi } from './cards';
import { packApi } from './packs';
import { shopApi } from './shop';
import { userDataApi } from './userData';
import { achievementsApi } from './achievements';
import { Mutation } from './createMutation';
import { appDataApi } from './appData';
import { notificationsApi } from './notifications';

type ApiCalls = { [key: string]: Query | Mutation };
type Api<A extends ApiCalls = any> = {
    [key in keyof A]: ReturnType<A[key]>;
};

const createBuildSlice = (client: ApolloClient<any>) => <IApiCalls extends ApiCalls>(
    apiCalls: IApiCalls,
): Api<IApiCalls> =>
    Object.entries(apiCalls).reduce((api, [name, fn]) => {
        return {
            ...api,
            [name]: fn(client),
        };
    }, {} as Api<IApiCalls>);

export type API = {
    cards: Api<typeof cardApi>;
    packs: Api<typeof packApi>;
    shop: Api<typeof shopApi>;
    userData: Api<typeof userDataApi>;
    appData: Api<typeof appDataApi>;
    achievements: Api<typeof achievementsApi>;
    notifications: Api<typeof notificationsApi>;
};

export const buildApi = (client: ApolloClient<any>): API => {
    const buildSlice = createBuildSlice(client);
    return {
        cards: buildSlice(cardApi),
        packs: buildSlice(packApi),
        shop: buildSlice(shopApi),
        userData: buildSlice(userDataApi),
        appData: buildSlice(appDataApi),
        achievements: buildSlice(achievementsApi),
        notifications: buildSlice(notificationsApi),
    };
};
