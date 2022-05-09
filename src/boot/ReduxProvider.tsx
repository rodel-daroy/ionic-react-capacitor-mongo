import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { useRealmApp } from './RealmApp';
import { useLanguage } from './ReactIntlProvider';
import { buildApi } from 'src/graphql';
import { buildStore } from './store';

interface IProps {
    children: ReactNode;
    buildApi: typeof buildApi;
}

/** buildStore moved to separate file to avoid circular dependency
 *  We want to import useAppDispatch in our source Code to have strict dispatch types
 */
export const ReduxProvider: React.FC<IProps> = ({ buildApi, children }: IProps) => {
    const client = useApolloClient();
    const api = buildApi(client);
    const realm = useRealmApp();
    const intl = useLanguage();

    const store = buildStore({ realm, api, intl });

    // The idea is to only replace individual reducers without reloading state (and dropping current state)
    // if (process.env.NODE_ENV === 'development' && module.hot) {
    //     module.hot.accept('src/features', () => store.replaceReducer(rootReducer));
    // }

    return <Provider store={store}>{children}</Provider>;
};
