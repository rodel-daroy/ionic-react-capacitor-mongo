import React, { ReactNode, useEffect } from 'react';
import { App, Credentials } from 'realm-web';
import { IUserData } from 'src/features/userData/types';
import { STATUS } from 'src/utility';
import { RealmApp } from './types';

const RealmAppContext = React.createContext<RealmApp>(null as any);

export const useRealmApp = (): RealmApp => {
    const app = React.useContext(RealmAppContext);
    if (!app) {
        throw new Error(`You must call useRealmApp() inside of a <RealmAppProvider />`);
    }
    return app;
};

interface IProps {
    appId: string;
    children: ReactNode;
}
export const RealmAppProvider: React.FC<IProps> = ({ appId, children }: IProps) => {
    const [status, setStatus] = React.useState<STATUS>(STATUS.IDLE);
    const [app] = React.useState<App<Realm.DefaultFunctionsFactory, IUserData>>(new App(appId));

    useEffect(() => {
        if (app.currentUser && status !== STATUS.SUCCESSFUL) return setStatus(STATUS.SUCCESSFUL);
        if (status !== STATUS.IDLE) return;
        setStatus(STATUS.LOADING);
        const anonCred = Credentials.anonymous();
        void app
            .logIn(anonCred)
            .then(() => setStatus(STATUS.SUCCESSFUL))
            .catch(() => setStatus(STATUS.FAILED));
    }, [app, status]);

    return <RealmAppContext.Provider value={app}>{status === STATUS.SUCCESSFUL && children}</RealmAppContext.Provider>;
};
