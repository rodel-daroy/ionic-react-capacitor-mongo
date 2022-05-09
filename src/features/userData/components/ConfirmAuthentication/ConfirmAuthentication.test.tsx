import React from 'react';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from 'src/test-utils';
import { ConfirmAuthentication } from '.';
import { Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { createMemoryHistory } from 'history';

describe('ConfirmAuthentication #page', () => {
    it('should show error message if no email query-param is present', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <div>prev-page</div>
                </Route>
                <Route path="/confirm-authentication">
                    <ConfirmAuthentication />
                </Route>
                <Route path="/collect">
                    <div>collect-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        // They visit confirmation-authentication with invalid query-parameters
        act(() => history.push(`/confirm-authentication?type=login`));

        // 🤠 end users will see an error-message about following an invalid link
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent('The Link you followed was invalid.');
    });

    it('should show error message if type is "register" and no username query-param is present', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <div>prev-page</div>
                </Route>
                <Route path="/confirm-authentication">
                    <ConfirmAuthentication />
                </Route>
                <Route path="/collect">
                    <div>collect-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        // They visit confirmation-authentication with invalid query-parameters
        act(() => history.push(`/confirm-authentication?type=register&email=some@email`));

        // 🤠 end users will see an error-message about following an invalid link
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent('The Link you followed was invalid.');
    });

    it('should show confirmation-link message if no token query-param is present', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <div>prev-page</div>
                </Route>
                <Route path="/confirm-authentication">
                    <ConfirmAuthentication />
                </Route>
                <Route path="/collect">
                    <div>collect-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'testrun@fanzone.media';
        const type = 'login';
        act(() => history.push(`/confirm-authentication?type=${type}&email=${email}`));

        // 🤠 end users will see a message about opening a confirmation E-Mail
        // It contains the E-mail we sent a message to and the type of E-Mail
        expect(screen.getByText('confirmation-link', { exact: false })).toHaveTextContent(
            'We sent an E-mail with a confirmation-link',
        );
        expect(screen.getByText('confirmation-link', { exact: false })).toHaveTextContent(email);
        expect(screen.getByText('confirmation-link', { exact: false })).toHaveTextContent(type);
    });

    xit('should show error message if token query-param is invalid', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <div>prev-page</div>
                </Route>
                <Route path="/confirm-authentication">
                    <ConfirmAuthentication />
                </Route>
                <Route path="/collect">
                    <div>collect-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'testrun@fanzone.media';
        const type = 'login';
        act(() => history.push(`/confirm-authentication?type=${type}&email=${email}&token=invalidJsonWebToken`));

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => screen.getByRole(/progressbar/i), { timeout: 5000 });
        await waitFor(() => screen.getByRole('alert'));

        // 🤠 end users will see an error-message about Username being required
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent('invalidJsonWebToken');
    });

    // we skip this test since the realm-function does not validate the email yet
    xit('should show error-message if email query-param is invalid', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <div>prev-page</div>
                </Route>
                <Route path="/confirm-authentication">
                    <ConfirmAuthentication />
                </Route>
                <Route path="/collect">
                    <div>collect-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const invalidEmail = 'invalidemail';
        const type = 'login';
        const validJWT = ''; // TODO: create testing JWT that does not expire
        history.push(`/confirm-authentication?type=${type}&email=${invalidEmail}&token=${validJWT}`);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => screen.getByRole(/progressbar/i));

        // 🤠 end users will see an error-message about Username being required
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent('Invalid E-Mail');
    });

    // we skip this test since the realm-function does not validate the email yet
    xit('should show error-message if type query-param is invalid', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <div>prev-page</div>
                </Route>
                <Route path="/confirm-authentication">
                    <ConfirmAuthentication />
                </Route>
                <Route path="/collect">
                    <div>collect-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'testrun@fanzone.media';
        const invalidType = 'invalitType';
        const validJWT = ''; // TODO: create testing JWT that does not expire
        history.push(`/confirm-authentication?type=${invalidType}&email=${email}&token=${validJWT}`);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => screen.getByRole(/progressbar/i));

        // 🤠 end users will see an error-message about Username being required
        expect(screen.getByRole('alert')).toBeDefined();
        expect(screen.getByRole('alert')).toHaveTextContent('Invalid E-Mail');
    });

    // skipping until we created a validJWT
    xit('redirects to collect page if authentication is successful / type=login', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <div>prev-page</div>
                </Route>
                <Route path="/confirm-authentication">
                    <ConfirmAuthentication />
                </Route>
                <Route path="/collect">
                    <div>collect-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'testrun@fanzone.media';
        const type = 'login';
        const validJWT = ''; // TODO: create testing JWT that does not expire
        history.push(`/confirm-authentication?type=${type}&email=${email}&token=${validJWT}`);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => screen.getByRole(/progressbar/i));

        // 🤠 end users will be redirected to collect page
        expect(screen.getByText('collect-page')).toBeDefined();
    });

    // skipping until we created a validJWT
    xit('redirects to collect page if authentication is successful / type=register', async () => {
        const history = createMemoryHistory();

        // 🤓 this is what developer users do
        await render(
            <IonReactRouter history={history}>
                <Route path="/">
                    <div>prev-page</div>
                </Route>
                <Route path="/confirm-authentication">
                    <ConfirmAuthentication />
                </Route>
                <Route path="/collect">
                    <div>collect-page</div>
                </Route>
            </IonReactRouter>,
        );

        // 🤠 this is what end users do
        const email = 'testrun@fanzone.media';
        const type = 'register';
        const validJWT = ''; // TODO: create testing JWT that does not expire
        history.push(`/confirm-authentication?type=${type}&email=${email}&token=${validJWT}`);

        // 🤠 end users will also note the presence of the loading indicator
        // and wait until it's gone before making some assertions
        await waitForElementToBeRemoved(() => screen.getByRole(/progressbar/i));

        // 🤠 end users will be redirected to collect page
        expect(screen.getByText('collect-page')).toBeDefined();
    });
});
