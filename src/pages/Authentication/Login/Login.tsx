import { IonPage, IonSpinner } from '@ionic/react';
import { SerializedError } from '@reduxjs/toolkit';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRealmApp } from 'src/boot';
import { STATUS } from 'src/utility';
import { Slider } from './Slider';
import {
    LoginScreen,
    LoginButton,
    LoginInput,
    LoginForm,
    LoginLogoWrapper,
    LoginLogo,
    RegisterLinkWrapper,
    RegisterLink,
} from './styles';
import { Logo_HiRes } from '../../../assets/images';
import { ConfirmAuthentication } from 'src/features';

const Login: React.FC = () => {
    const intl = useIntl();
    const app = useRealmApp();

    const [email, setEmail] = useState<string>();
    const [error, setError] = useState<string>();
    const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [slideshow, setSlideshow] = useState(true);

    const submit = useCallback(() => {
        if (!email) return setError('Enter an E-Mail.');
        if (status === STATUS.LOADING) return;
        setStatus(STATUS.LOADING);
        void app
            .currentUser!.callFunction('requestMagicLink', { email, type: 'login' })
            .then(() => {
                setStatus(STATUS.SUCCESSFUL);
                setIsConfirmVisible(true);
            })
            .catch((e: Error | SerializedError) => {
                setStatus(STATUS.FAILED);
                setError(e.message);
                setIsConfirmVisible(false);
            });
    }, [app.currentUser, email, status]);

    const renderedLoginScreen = useMemo(
        () => (
            <LoginScreen>
                <LoginLogoWrapper>
                    <LoginLogo src={Logo_HiRes} />
                </LoginLogoWrapper>

                <LoginForm>
                    <LoginInput
                        type="email"
                        autoComplete="email"
                        autoFocus={true}
                        required={true}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Enter your E-Mail',
                            description: 'Placeholder-text for E-Mail input on login-page',
                        })}
                        onInput={(e) => setEmail(e.currentTarget.value)}
                    />
                    {error && <p role="alert">{error}</p>}
                    <LoginButton onClick={submit}>
                        {status === STATUS.LOADING ? <IonSpinner role="progressbar" /> : 'Send Magic Link'}
                    </LoginButton>
                </LoginForm>

                {isConfirmVisible && email && <ConfirmAuthentication email={email} type="register" />}

                <RegisterLinkWrapper>
                    <RegisterLink href="/register">Need to create an account? Register here</RegisterLink>
                </RegisterLinkWrapper>
            </LoginScreen>
        ),
        [email, error, intl, isConfirmVisible, status, submit],
    );
    const renderedSlider = useMemo(() => <Slider slideshow={slideshow} setSlideshow={() => setSlideshow(false)} />, [
        slideshow,
    ]);

    return <IonPage>{slideshow ? renderedSlider : renderedLoginScreen}</IonPage>;
};

export default Login;
