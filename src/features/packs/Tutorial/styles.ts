import { IonButton, IonImg, IonPage, IonSlide, IonSlides } from '@ionic/react';
import styled from 'styled-components';

export const StyledPage = styled(IonPage)`
    z-index: 1;
`;

export const StyledSlides = styled(IonSlides)`
    height: 100%;
    background: #e5e5e5;
    color: black;
`;

export const StyledSlide = styled(IonSlide)`
    display: block;
`;

export const StyledSlideHeader = styled.h1`
    font-size: 17px;
    font-weight: 500;
    margin: 30px 0;
`;

export const StyledSlideImage = styled(IonImg)`
    width: 80%;
    height: calc(100% - 180px);
    margin: 30px auto;
    border-radius: 15px;
`;

export const StyledSlideMoreInfo = styled.h3`
    font-size: 14px;
    font-weight: 400;
`;

export const StyledButton = styled(IonButton)`
    --color: white;
`;
