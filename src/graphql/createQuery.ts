import { QueryOptions, ApolloClient, ApolloQueryResult } from '@apollo/client';

type ExtendedQueryOptions<T, R, QueryArg = any> = Omit<QueryOptions<T, R>, 'query'> & {
    query: QueryOptions<T, R>['query'] | ((arg: QueryArg) => QueryOptions<T, R>['query']);
};
export type CreateQuery = <T, R, QueryArg = any>(
    queryOptions: ExtendedQueryOptions<T, R, QueryArg>,
) => Query<T, R, QueryArg>;
export type Query<T = any, R = any, QueryArg = any> = (
    client: ApolloClient<any>,
) => (
    variables: T,
    options?: Partial<ExtendedQueryOptions<T, R, QueryArg>>,
    queryArg?: QueryArg,
) => Promise<ApolloQueryResult<R>>;

export const createQuery: CreateQuery = (queryOptions) => (client) => (variables, options, queryArg) => {
    const query = typeof queryOptions.query === 'function' ? queryOptions.query(queryArg!) : queryOptions.query;

    // @ts-ignore
    return client.query({ ...queryOptions, query, ...options, variables });
};
