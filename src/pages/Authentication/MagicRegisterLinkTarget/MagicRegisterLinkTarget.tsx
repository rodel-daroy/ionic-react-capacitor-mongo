import { useIonRouter, IonPage, IonHeader, IonTitle, IonContent, IonText, IonLoading } from '@ionic/react';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Credentials } from 'realm-web';
import { useAppDispatch } from 'src/boot/store';
import { logInUser } from 'src/features';
import { parseQueryString, STATUS } from 'src/utility';

const MagicRegisterLinkTarget: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useIonRouter();

    const [error, setError] = useState<string>();
    const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
    const query = useMemo(() => parseQueryString(router.routeInfo.search), [router.routeInfo.search]);

    useEffect(() => {
        if (status !== STATUS.IDLE) return;

        const { token, email, username } = query;
        if (!email || !token) {
            setStatus(STATUS.FAILED);
            return setError('The Link you followed was invalid. Please try opening it again.');
        }

        setStatus(STATUS.LOADING);
        const customAuth = Credentials.function({ email, token, username });

        /* logInUser alternatively registers a new user if it does not exist yet */
        void dispatch(logInUser(customAuth))
            .then(() => {
                setStatus(STATUS.SUCCESSFUL);
                router.push('/');
            })
            .catch((e: Error) => {
                setStatus(STATUS.FAILED);
                setError(e.message);
            });
    }, [dispatch, status, query, router]);

    return (
        <IonPage>
            <IonHeader>
                <IonTitle>
                    <FormattedMessage
                        description="Login Page Title"
                        defaultMessage="Confirm your registration, {username}!"
                        values={{
                            username: query.username ? `, ${query.username}` : '',
                        }}
                    />
                </IonTitle>
            </IonHeader>
            {error && <p role="alert">{error}</p>}
            <IonContent>{getContent(status, query)}</IonContent>
        </IonPage>
    );
};

export default MagicRegisterLinkTarget;

function getContent(status: STATUS, query: Record<string, string>) {
    const { email } = query;
    switch (status) {
        case STATUS.FAILED:
            return (
                <IonText color="red">
                    <FormattedMessage
                        description="Confirm Registration failed message"
                        defaultMessage="We could not confirm your registration. We are sorry for the inconvenience, please try again."
                        values={{ email }}
                    />
                </IonText>
            );
        case STATUS.SUCCESSFUL:
            return (
                <IonText color="red">
                    <FormattedMessage
                        description="Confirm Registration succeed message"
                        defaultMessage="We are redirecting you."
                    />
                </IonText>
            );
        case STATUS.LOADING:
            return (
                <span role="progressbar">
                    <IonLoading
                        isOpen={true}
                        message={'Please wait...'}
                        showBackdrop={true}
                        spinner="circular"
                        duration={9000}
                    />
                </span>
            );
        case STATUS.IDLE:
        default:
            <IonText>
                <FormattedMessage
                    description="Confirm Authentication explanation"
                    defaultMessage="This page allows you to register with a magic link. If you are seeing this message your link was invalid. Please try again."
                />
            </IonText>;
    }
}
