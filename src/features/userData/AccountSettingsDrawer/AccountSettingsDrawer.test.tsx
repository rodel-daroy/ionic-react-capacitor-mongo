import React from 'react';
import { render, screen, findByText, act } from 'src/test-utils';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { createMemoryHistory } from 'history';
import AccountSettingsDrawer from 'src/features/userData/AccountSettingsDrawer/AccountSettingsDrawer';
import { IonApp } from '@ionic/react';

describe('AccountSettingsDrawer', () => {
    it('redirects to /login page when logout is clicked', async () => {
        // 🤓 this is what developer users do
        const history = createMemoryHistory();
        const result = await render(
            <IonApp>
                <IonReactRouter history={history}>
                    <Route path="/test">
                        <AccountSettingsDrawer />
                    </Route>
                    <Route path="/login">
                        <div>Test-Login-Page</div>
                    </Route>
                </IonReactRouter>
            </IonApp>,
        );

        // 🤠 this is what end users do
        act(() => history.push(`/test`));
        const button = await findByText(result.container, 'Logout');
        userEvent.click(button);

        // 🤠 end users will be redirected to the /login route
        await findByText(result.container, 'Test-Login-Page');
        expect(screen.getByText('Test-Login-Page')).toHaveTextContent('Test-Login-Page');
    });
});
