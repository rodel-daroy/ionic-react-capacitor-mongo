import { IonPage, IonSpinner } from '@ionic/react';
import { SerializedError } from '@reduxjs/toolkit';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRealmApp } from 'src/boot';
import { ConfirmAuthentication } from 'src/features';
import { STATUS } from 'src/utility';
import { Logo_HiRes } from '../../../assets/images';

import {
    RegisterScreen,
    RegisterLogoWrapper,
    RegisterLogo,
    RegisterButton,
    RegisterForm,
    RegisterInput,
    LoginLinkWrapper,
    LoginLink,
} from './styles';

const Register: React.FC = () => {
    const intl = useIntl();
    const app = useRealmApp();

    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [error, setError] = useState<string>();
    const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const submit = useCallback(() => {
        if (!email) return setError('Enter an E-Mail.');
        if (!username) return setError('Enter a Username.');
        if (status === STATUS.LOADING) return;
        setStatus(STATUS.LOADING);

        void app
            .currentUser!.callFunction('requestMagicLink', { email, username, type: 'register' })
            .then(() => {
                setStatus(STATUS.SUCCESSFUL);
                setIsConfirmVisible(true);
            })
            .catch((e: Error | SerializedError) => {
                setStatus(STATUS.FAILED);
                setError(e.message);
                setIsConfirmVisible(false);
            });
    }, [app.currentUser, email, username, status]);

    return (
        <IonPage>
            <RegisterScreen>
                <RegisterLogoWrapper>
                    <RegisterLogo src={Logo_HiRes} />
                </RegisterLogoWrapper>
                <RegisterForm>
                    <RegisterInput
                        type="email"
                        autoComplete="email"
                        autoFocus={true}
                        required={true}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Enter your E-Mail',
                            description: 'Placeholder-text for E-Mail input on register-page',
                        })}
                        onInput={(e) => setEmail(e.currentTarget.value)}
                    />
                    <RegisterInput
                        type="text"
                        required={true}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Choose a username',
                            description: 'Placeholder-text for username input on register-page',
                        })}
                        onInput={(e) => setUsername(e.currentTarget.value)}
                    />
                    {error && <p role="alert">{error}</p>}
                    <RegisterButton onClick={submit}>
                        {status === STATUS.LOADING ? <IonSpinner role="progressbar" /> : 'Register'}
                    </RegisterButton>
                </RegisterForm>

                {isConfirmVisible && email && username && (
                    <ConfirmAuthentication email={email} type="register" username={username} />
                )}

                <LoginLinkWrapper>
                    <LoginLink href="/register">Already have an account? Login here</LoginLink>
                </LoginLinkWrapper>
            </RegisterScreen>
        </IonPage>
    );
};

export default Register;
