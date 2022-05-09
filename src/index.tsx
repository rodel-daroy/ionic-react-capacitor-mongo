import React from 'react';
import ReactDOM from 'react-dom';
import { IonReactRouter } from '@ionic/react-router';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ReactIntlProvider, RealmApolloProvider, ReduxProvider, RealmAppProvider, reportWebVitals } from 'src/boot';
import { buildApi } from 'src/graphql';

ReactDOM.render(
    <React.StrictMode>
        <RealmAppProvider appId={process.env.REACT_APP_REALM_APP_ID!}>
            <RealmApolloProvider>
                <ReactIntlProvider>
                    <IonReactRouter>
                        <ReduxProvider buildApi={buildApi}>
                            <App />
                        </ReduxProvider>
                    </IonReactRouter>
                </ReactIntlProvider>
            </RealmApolloProvider>
        </RealmAppProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
