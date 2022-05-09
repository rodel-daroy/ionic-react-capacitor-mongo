import React, { Suspense, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import GlobalFonts from 'src/fonts/fonts';
import styled from 'styled-components';

import { LazyLogin, LazyRegister, LazyMagicRegisterLinkTarget, LazyMagicLoginLinkTarget } from 'src/pages';
import { useRealmApp } from 'src/boot';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.sass';
import { ProtectedRoute } from './utility';
import { callFunction, refreshUserData } from 'src/features';
import { useAppDispatch } from './boot/store';
import { LazyTutorial } from './features/packs/Tutorial';
import { LazyZoneSelection } from './pages/ZoneSelection';
import { useSelector } from 'react-redux';
import { RootState } from './boot/types';
import { LazyZone } from './pages/Zone';
import { ActivitiesDrawer } from './features/appData/ActivitiesDrawer';
import AccountSettingsDrawer from './features/userData/AccountSettingsDrawer/AccountSettingsDrawer';
import { LazyOnboard } from './pages/Zone/Home/Onboard';

const Wrapper = styled(IonApp)`
    max-width: 410px;
    max-height: 810px;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    margin: auto;
    transform: translate3d(0, 0, 0);
`;

const App: React.FC = () => {
    const app = useRealmApp();
    const dispatch = useAppDispatch();
    const status = useSelector((state: RootState) => state.userData.status);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        Boolean(app.currentUser && app.currentUser.providerType !== 'anon-user'),
    );

    useEffect(() => void dispatch(callFunction({ name: 'onOpenApp' })), [dispatch]);

    useEffect(() => {
        const loggedIn = Boolean(app.currentUser && app.currentUser.providerType !== 'anon-user');
        setIsLoggedIn(loggedIn);
    }, [app, app.currentUser, app.currentUser?.providerType, status]);

    useEffect(() => {
        if (isLoggedIn) void dispatch(refreshUserData(app.currentUser!.id));
        // const interval = setInterval(() => {
        //     if (isLoggedIn) void dispatch(refreshUserData(app.currentUser!.id));
        // }, 30000);
        // return () => clearInterval(interval);
    }, [app.currentUser, dispatch, isLoggedIn]);

    useEffect(() => {
        const userBackScript = document.createElement('script');
        userBackScript.innerHTML =
            "window.Userback = window.Userback || {}; Userback.access_token = '29715|43356|XK1TMYmysJlpUR4hzwc0kAZbI'; (function(d) { var s = d.createElement('script');s.async = true; s.src = 'https://static.userback.io/widget/v1.js'; (d.head || d.body).appendChild(s); })(document);";
        userBackScript.async = true;
        document.body.appendChild(userBackScript);
    }, []);

    return (
        <Wrapper>
            <GlobalFonts />
            <Suspense fallback={<IonSpinner />}>
                <IonRouterOutlet>
                    <ProtectedRoute isLoggedIn={isLoggedIn} path="/zone/:zoneId">
                        <LazyZone />
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/activity" component={ActivitiesDrawer} />

                    <ProtectedRoute isLoggedIn={isLoggedIn} exact path="/account" component={AccountSettingsDrawer} />

                    <ProtectedRoute isLoggedIn={isLoggedIn} path="/onboarding">
                        <LazyOnboard />
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isLoggedIn} path="/tutorial">
                        <LazyTutorial />
                    </ProtectedRoute>

                    <Route exact path="/register">
                        <LazyRegister />
                    </Route>

                    <Route exact path="/login">
                        <LazyLogin />
                    </Route>

                    <Route exact path="/magic-login-link-target">
                        <LazyMagicLoginLinkTarget />
                    </Route>

                    <Route exact path="/magic-register-link-target">
                        <LazyMagicRegisterLinkTarget />
                    </Route>

                    <ProtectedRoute isLoggedIn={isLoggedIn} path="/" exact component={LazyZoneSelection} />
                </IonRouterOutlet>
            </Suspense>
        </Wrapper>
    );
};

export default App;
