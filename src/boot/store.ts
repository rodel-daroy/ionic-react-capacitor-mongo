import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { achievementsReducer } from 'src/features/achievements/achievementsSlice';
import { appDataReducer } from 'src/features/appData/appDataSlice';
import { cardsReducer } from 'src/features/cards/cardsSlice';
import { marketReducer } from 'src/features/market/marketSlice';
import { notificationsReducer } from 'src/features/notifications/notificationsSlice';
import { packsReducer } from 'src/features/packs/packsSlice';
import { shopReducer } from 'src/features/shop/shopSlice';
import { userDataReducer } from 'src/features/userData/userDataSlice';
import { API } from 'src/graphql';
import { IIntlContext } from './ReactIntlProvider';
import { RealmApp } from './types';

interface IStoreOptions {
    realm: RealmApp;
    api: API;
    intl: IIntlContext;
}

const rootReducer = combineReducers({
    cards: cardsReducer,
    packs: packsReducer,
    shop: shopReducer,
    market: marketReducer,
    userData: userDataReducer,
    appData: appDataReducer,
    achievements: achievementsReducer,
    notifications: notificationsReducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildStore = (options: IStoreOptions) => {
    const { realm, api, intl } = options;

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: { realm, api, intl },
                },
            }),
        preloadedState: {},
        enhancers: [],
        devTools: process.env.NODE_ENV === 'development',
    });
    return store;
};

export type AppDispatch = ReturnType<typeof buildStore>['dispatch'];
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
