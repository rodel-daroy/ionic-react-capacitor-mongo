import styled from 'styled-components';
import { IonContent } from '@ionic/react';
import { Button } from 'src/components';

export const RegisterScreen = styled(IonContent)`
    height: 100%;
    display: block;
    align-items: center;
    padding: 20px;
`;

export const RegisterLogoWrapper = styled.div`
    display: flex;
    margin: 110px auto;
    padding: 20px;
`;

export const RegisterLogo = styled.img`
    display: flex;
    margin: 0 auto;
    max-width: 90px;
    max-height: 100px;
    width: 100%;
    height: 100%;
`;

export const RegisterButton = styled(Button)`
    --border-radius: 4px !important;
    width: 90% !important;
    display: flex;
    margin: 0 auto;
`;

export const RegisterInput = styled.input`
    border-radius: 4px !important;
    display: flex;
    margin: 20px auto;
    width: 90%;
    min-height: 50px;
    background: white;
    color: black;
`;

export const RegisterForm = styled.div`
    align-items: center;
    align-content: center;
    margin: 0 auto;
`;

export const LoginLinkWrapper = styled.div`
    display: flex;
    margin: 140px auto 20px;
`;

export const LoginLink = styled.a`
    display: flex;
    margin: 0 auto;
    color: white;
    transition: 0.3s;

    &:hover {
        color: orange;
    }
`;
