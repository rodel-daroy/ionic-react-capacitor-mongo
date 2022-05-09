import React from 'react';
import { getByRole, render, screen, waitFor, waitForElementToBeRemoved } from 'src/test-utils';
import userEvent from '@testing-library/user-event';
import { Login } from '.';
import { Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { createMemoryHistory } from 'history';

describe('Login #page', () => {
    it('shows error message if no email is entered', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Login />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        const button = screen.getByText('Send Magic Link');

        // 🤠 this is what end users do
        userEvent.click(button);

        // 🤠 end users will see an error-message
        expect(screen.getByRole('alert')).toBeDefined();
    });

    it('shows error-message if invalid email is provided', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Login />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'invalidemail';
        userEvent.type(screen.getByPlaceholderText('E-Mail', { exact: false }), email);
        const button = screen.getByText('Send Magic Link');
        userEvent.click(button);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => getByRole(button, /progressbar/i));

        // 🤠 end users will see an error-message
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent(`Invalid Payload: ${email} for parameter 'email'.`);
    });

    it('shows error if provided email is not connected to any account', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Login />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'non-existant@email.com'; // This email does not exist
        userEvent.type(screen.getByPlaceholderText('E-Mail', { exact: false }), email);
        const button = screen.getByText('Send Magic Link');
        userEvent.click(button);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => getByRole(button, /progressbar/i));

        // 🤠 end users will see an error-message
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent(
            'Invalid Login attempt. No user with provided email exists.',
        );
    });

    it('redirects to confirm-authentication page if successful', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Login />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'mail@m-roemmelt.com'; // This email needs to exist in the DB
        userEvent.type(screen.getByPlaceholderText('E-Mail', { exact: false }), email);
        const button = screen.getByText('Send Magic Link');
        userEvent.click(button);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitFor(() => getByRole(button, /progressbar/i));
        await waitForElementToBeRemoved(() => getByRole(button, /progressbar/i), { timeout: 5000 });

        // 🤠 end users will be redirected to confirm-authentication page
        // and correct query parameters are passed
        expect(screen.getByText('confirm-authentication-page')).toBeDefined();
        expect(history.location.search).toEqual(`?type=login&email=${email}`);
    });
});
