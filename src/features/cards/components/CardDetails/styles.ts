import { IonButton } from '@ionic/react';
import styled from 'styled-components';

export const CardWrapper = styled.div`
    padding: 15px;
`;

export const SlidePageIndicator = styled.span`
    position: absolute;
    top: 20px;
    right: 20px;
    color: #737373;
    font-size: 12px;
    font-weight: 700;
    z-index: 1;
`;

export const SlideBackBtn = styled(IonButton)`
    position: absolute;
    left: 0;
    font-size: 10px;
    color: #252525;
    --background: transparent;
    --background-activated: transparent;
    --background-focused: transparent;
    --background-hover: transparent;
    --box-shadow: none;
`;

export const SlideFowardBtn = styled(SlideBackBtn)`
    position: absolute;
    left: unset;
    right: 0;
`;
