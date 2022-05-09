import { screen, render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { App } from 'realm-web';
import { buildStore } from 'src/boot/store';
import { createRealmApolloClient, ReactIntlProvider, RealmApolloProvider, RealmAppProvider } from '../src/boot';
import { ReduxProvider } from '../src/boot/ReduxProvider';
import { buildApi } from '../src/graphql';

const AllTheProviders: React.FC = ({ children }: { children?: ReactNode }) => (
    <React.StrictMode>
        <RealmAppProvider appId={process.env.REACT_APP_REALM_APP_ID!}>
            <RealmApolloProvider>
                <ReactIntlProvider>
                    <ReduxProvider buildApi={buildApi}>
                        <div data-testid="setup-finished">{children}</div>
                    </ReduxProvider>
                </ReactIntlProvider>
            </RealmApolloProvider>
        </RealmAppProvider>
    </React.StrictMode>
);

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>,
): Promise<RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>> =>
    new Promise((r) => {
        const res = render(ui, { wrapper: AllTheProviders, ...options });
        void screen.findByTestId('setup-finished').then(() => r(res));
    });

const realm = new App(process.env.REACT_APP_REALM_APP_ID!);
const mockedIntl = {} as any;
const api = buildApi(createRealmApolloClient(realm));
const store = buildStore({ realm, api, intl: mockedIntl });

export * from '@testing-library/react';
export { store, realm, customRender as render };
