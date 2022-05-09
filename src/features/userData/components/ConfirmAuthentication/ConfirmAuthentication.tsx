import { InputChangeEventDetail } from '@ionic/core';
import { useIonRouter, IonText, IonLoading } from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Credentials } from 'realm-web';
import { useAppDispatch } from 'src/boot/store';
import { logInUser } from 'src/features/userData/userDataSlice';
import { IUserData } from 'src/features/userData/types';
import { STATUS } from 'src/utility';
import { ConfirmWrapper, StyledInput, ConfirmTextWrapper, ConfirmText } from './styles';

interface IProps {
    email: string;
    type: 'login' | 'register';
    username?: string;
}
export const ConfirmAuthentication: React.FC<IProps> = ({ email, username, type }: IProps) => {
    const dispatch = useAppDispatch();
    const router = useIonRouter();

    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string>();
    const [status, setStatus] = useState<STATUS>(STATUS.IDLE);

    const login = useCallback(
        (code: string) => {
            setStatus(STATUS.LOADING);
            const customAuth = Credentials.function({ email, code, username });

            /* logInUser alternatively registers a new user if it does not exist yet */
            void dispatch(logInUser(customAuth))
                .then((response) => {
                    setStatus(STATUS.SUCCESSFUL);
                    if (response.payload && (response.payload as IUserData).tutorialFinished) router.push('/');
                    else router.push('/onboarding');
                })
                .catch((e: Error) => {
                    setStatus(STATUS.FAILED);
                    setError(e.message);
                });
        },
        [dispatch, email, router, username],
    );

    useEffect(() => {
        if (code.length !== 6) return;
        switch (status) {
            case STATUS.IDLE:
                return login(code);
            case STATUS.FAILED:
            case STATUS.LOADING:
            case STATUS.SUCCESSFUL:
            default:
        }
    }, [code, login, status]);

    const handleChange = useCallback(
        (e: CustomEvent<InputChangeEventDetail>) => {
            setCode(e.detail.value || '');
            setStatus(STATUS.IDLE);
        },
        [setCode],
    );

    return (
        <React.Fragment>
            {error && <p role="alert">{error}</p>}
            <div>{getContent(status, { type, username, email }, handleChange)}</div>
        </React.Fragment>
    );
};

function getContent(
    status: STATUS,
    query: Record<string, string | undefined>,
    handleChange: (event: CustomEvent<InputChangeEventDetail>) => void,
) {
    const { email, type } = query;
    switch (status) {
        case STATUS.FAILED:
            return (
                <React.Fragment>
                    <ConfirmTextWrapper>
                        <ConfirmText color="red">
                            <FormattedMessage
                                description="Confirm Authentication failed message"
                                defaultMessage="We could not confirm your {type}. We are sorry for the inconvenience, please try again."
                                values={{ email, type: type === 'register' ? 'registration' : 'login' }}
                            />
                        </ConfirmText>
                    </ConfirmTextWrapper>
                    <StyledInput type="text" onIonChange={handleChange} />
                </React.Fragment>
            );

        case STATUS.SUCCESSFUL:
            return (
                <ConfirmTextWrapper>
                    <ConfirmText>
                        <FormattedMessage
                            description="Confirm Authentication succeed message"
                            defaultMessage="We are redirecting you."
                        />
                    </ConfirmText>
                </ConfirmTextWrapper>
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
            return (
                <React.Fragment>
                    <ConfirmWrapper>
                        <IonText>
                            <FormattedMessage
                                description="Confirm Authentication explanation"
                                defaultMessage="We sent an E-mail with a confirmation-link or -code to {email}. Please click the link or insert the code below to confirm your {type}."
                                values={{ email, type: type === 'register' ? 'registration' : 'login' }}
                            />
                        </IonText>
                        <StyledInput type="text" onIonChange={handleChange} />
                    </ConfirmWrapper>
                </React.Fragment>
            );
    }
}
