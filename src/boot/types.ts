import { App } from 'realm-web';
import { IAchievementsSliceState } from 'src/features/achievements/types';
import { IAppDataSliceState } from 'src/features/appData/types';
import { ICardsSliceState } from 'src/features/cards/types';
import { IMarketSliceState } from 'src/features/market/types';
import { INotificationsSliceState } from 'src/features/notifications/types';
import { IPacksSliceState } from 'src/features/packs/types';
import { IShopSliceState } from 'src/features/shop/types';
import { IUserData, IUserDataSliceState } from 'src/features/userData/types';
import type { API } from 'src/graphql';
import { LOCALES } from './ReactIntlProvider';

export type RealmApp = App<Realm.DefaultFunctionsFactory, IUserData>;

export type ThunkExtra = {
    realm: RealmApp;
    api: API;
    intl: { setLanguage: React.Dispatch<React.SetStateAction<LOCALES>>; currentLanguage: LOCALES };
};

export type RootState = {
    cards: ICardsSliceState;
    packs: IPacksSliceState;
    shop: IShopSliceState;
    market: IMarketSliceState;
    userData: IUserDataSliceState;
    appData: IAppDataSliceState;
    achievements: IAchievementsSliceState;
    notifications: INotificationsSliceState;
};
