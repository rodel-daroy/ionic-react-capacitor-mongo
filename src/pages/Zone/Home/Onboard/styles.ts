import { IonPage, IonProgressBar, IonSlide, IonSlides } from '@ionic/react';
import styled from 'styled-components';

export const StyledPage = styled(IonPage)`
    z-index: 1;
    --background: var(--ion-background-color);
`;

export const StyledSlides = styled(IonSlides)`
    height: 100%;
    --background: var(--ion-background-color);
    color: var(--ion-color);
`;

export const StyledSlide = styled(IonSlide)`
    display: block;
`;

export const OnboardProgress = styled(IonProgressBar)`
    margin-top: 50px;
    --progress-background: var(--fanzone-orange);
    --buffer-background: rgb(255 129 1 / 30%);
`;

export const SkipOnboarding = styled.a`
    position: absolute;
    width: 100%;
    bottom: 20px;
    color: var(--ion-color-medium);
    font-size: 14px;
    font-weight: 500;
    text-align: center;
`;
