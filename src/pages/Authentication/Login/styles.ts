import styled from 'styled-components';
import { IonSlides, IonSlide, IonContent } from '@ionic/react';
import { Button } from 'src/components';

export const StyledSlider = styled(IonSlides)`
    min-height: 100px;
    margin: 10px;
    height: 100%;
`;

export const StyledSlide = styled(IonSlide)`
    background-color: white;
    display: block;
    height: 100%;
`;

export const SlideTitle = styled.h1`
    font-size: 1.4em;
    color: orange;
    text-align: center;
    margin: 35px 0px;
`;

export const SlideParagraph = styled.p`
    color: black;
    font-size: 0.9em;
    text-align: center;
    padding: 12px;
`;

export const SlideImageWrapper = styled.div`
    display: block;
    margin: 0 auto;
`;

export const SlideImage = styled.img`
    display: flex;
    padding: 20px;
    height: 100%;
    width: 100%;
`;

export const LoginScreen = styled(IonContent)`
    height: 100%;
    display: block;
    align-items: center;
    padding: 20px;
`;

export const LoginLogoWrapper = styled.div`
    display: flex;
    margin: 110px auto;
    padding: 20px;
`;

export const LoginLogo = styled.img`
    display: flex;
    margin: 0 auto;
    max-width: 90px;
    max-height: 100px;
    width: 100%;
    height: 100%;
`;

export const LoginButton = styled(Button)`
    --border-radius: 4px !important;
    width: 90% !important;
    display: flex;
    margin: 0 auto;
`;

export const LoginInput = styled.input`
    border-radius: 4px !important;
    display: flex;
    margin: 20px auto;
    width: 90%;
    min-height: 50px;
    background: white;
    color: black;
`;

export const LoginForm = styled.div`
    align-items: center;
    align-content: center;
    margin: 0 auto;
`;

export const RegisterLinkWrapper = styled.div`
    display: flex;
    margin: 140px auto 20px;
`;

export const RegisterLink = styled.a`
    display: flex;
    margin: 0 auto;
    color: var(--color);
    transition: 0.3s;

    &:hover {
        color: orange;
    }
`;
