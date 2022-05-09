import React from 'react';
import { getByRole, render, screen, waitFor, waitForElementToBeRemoved } from 'src/test-utils';
import userEvent from '@testing-library/user-event';
import { Register } from '.';
import { Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { createMemoryHistory } from 'history';

describe('Register #page', () => {
    it('shows error message if no email is entered', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Register />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        // They don't enter an E-Mail and click Regsiter
        const button = screen.getByText('Register');
        userEvent.click(button);

        // 🤠 end users will see an error-message about E-Mail being required
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent('E-Mail');
    });

    it('shows error message if no username is entered', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Register />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        // They enter an email; forget to enter a username; click Register
        userEvent.type(screen.getByPlaceholderText('E-Mail', { exact: false }), 'some@email');
        const button = screen.getByText('Register');
        userEvent.click(button);

        // 🤠 end users will see an error-message about Username being required
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent('Username');
    });

    it('shows error-message if invalid email is provided', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Register />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        // They enter an email, username, and click Register
        const email = 'invalidemail';
        userEvent.type(screen.getByPlaceholderText('E-Mail', { exact: false }), email);
        userEvent.type(screen.getByPlaceholderText('username', { exact: false }), 'MyName');
        const button = screen.getByText('Register');
        userEvent.click(button);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => getByRole(button, /progressbar/i));

        // 🤠 end users will see an error-message
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent(`Invalid Payload: ${email} for parameter 'email'.`);
    });

    it('shows error if provided email is already connected to an account', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Register />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'mail@m-roemmelt.com'; // Account with this email should exist
        userEvent.type(screen.getByPlaceholderText('E-Mail', { exact: false }), email);
        userEvent.type(screen.getByPlaceholderText('username', { exact: false }), 'MyName');
        const button = screen.getByText('Register');
        userEvent.click(button);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => getByRole(button, /progressbar/i));

        // 🤠 end users will see an error-message
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent(
            'Invalid Register attempt. User with provided email already exists.',
        );
    });

    // Disabled because we need a way to clean up the newly registered user from the DB
    xit('redirects to confirm-authentication page if successful', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <Register />
                </Route>
                <Route path="/confirm-authentication">
                    <div>confirm-authentication-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'test-register@email.com'; // No Account with this email should exist
        const username = 'myname';
        userEvent.type(screen.getByPlaceholderText('E-Mail', { exact: false }), email);
        userEvent.type(screen.getByPlaceholderText('username', { exact: false }), username);
        const button = screen.getByText('Register');
        userEvent.click(button);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitFor(() => getByRole(button, /progressbar/i));
        await waitForElementToBeRemoved(() => getByRole(button, /progressbar/i), { timeout: 5000 });

        // 🤠 end users will be redirected to confirm-authentication page
        // and correct query parameters are passed
        expect(screen.getByText('confirm-authentication-page')).toBeDefined();
        expect(history.location.search).toEqual(`?type=register&email=${email}&username=${username}`);
    });
});
