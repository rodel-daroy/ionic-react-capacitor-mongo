import React, { ReactNode, useMemo } from 'react';
import { useRealmApp } from './RealmApp';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { RealmApp } from './types';

// Create an ApolloClient that connects to the provided Realm.App's GraphQL API
export const createRealmApolloClient = (app: RealmApp): ApolloClient<NormalizedCacheObject> => {
    const link = new HttpLink({
        // Realm apps use a standard GraphQL endpoint, identified by their App ID
        uri: `https://eu-central-1.aws.realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`,
        // A custom fetch handler adds the logged in user's access token to GraphQL requests
        fetch: async (uri: string, options: RequestInit = {}) => {
            if (!app.currentUser) {
                throw new Error(`Must be logged in to use the GraphQL API`);
            }
            // Refreshing a user's custom data also refreshes their access token
            await app.currentUser.refreshCustomData();

            options.headers = (options.headers as Record<string, string>) || {};
            // The handler adds a bearer token Authorization header to the otherwise unchanged request
            options.headers.Authorization = `Bearer ${String(app.currentUser.accessToken)}`;
            return fetch(uri, options);
        },
    });

    const cache = new InMemoryCache({
        // This is required to store objects with identical _id / id values
        // e.g. User.achievements)
        dataIdFromObject: (o, context) => {
            const __typename = o.__typename;
            const id = o.id === void 0 ? o._id : o.id;

            if (typeof __typename === 'string') {
                if (o.__typename === 'UserAchievement') {
                    return `${o.__typename}-${o.achievementDate as string}`;
                }
                if (o.__typename === 'TranslationItem') {
                    return undefined;
                }

                if (context) {
                    context.keyObject = id !== void 0 ? { id } : void 0;
                }

                if (id !== void 0) {
                    return `${__typename}:${
                        typeof id === 'number' || typeof id === 'string' ? id : JSON.stringify(id)
                    }`;
                }
            }
        },
        typePolicies: {
            User: {
                fields: {
                    coins: {
                        read(coins) {
                            return Number(coins);
                        },
                    },
                },
            },
            Card: {
                fields: {
                    price: {
                        read(price) {
                            return Number(price);
                        },
                    },
                },
            },
            MetaCard: {
                fields: {
                    priceAvg: {
                        read(price) {
                            return Number(price);
                        },
                    },
                    priceMax: {
                        read(price) {
                            return Number(price);
                        },
                    },
                    priceMin: {
                        read(price) {
                            return Number(price);
                        },
                    },
                    priceSuggested: {
                        read(price) {
                            return Number(price);
                        },
                    },
                },
            },
        },
    });

    return new ApolloClient({ link, cache });
};

export const RealmApolloProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const app = useRealmApp();
    const client = useMemo(() => createRealmApolloClient(app), [app]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
