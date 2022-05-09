import { MutationOptions, ApolloClient, FetchResult } from '@apollo/client';

export type CreateMutation = <Q, T, R>(mutationOptions: MutationOptions<T, R>) => Mutation<Q, T, R>;
export type Mutation<Q = any, T = any, R = any> = (
    client: ApolloClient<any>,
) => (query: Q, variables: R) => Promise<FetchResult<T>>;

export const createMutation: CreateMutation = (mutationOptions) => (client) => (
    query: { [key: string]: any },
    variables,
) => client.mutate({ ...mutationOptions, variables: { query, ...variables } });
