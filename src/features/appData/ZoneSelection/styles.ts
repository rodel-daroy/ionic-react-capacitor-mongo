import styled from 'styled-components';
import { IonIcon } from '@ionic/react';
import { Zone_Selection_Header } from '../../../assets/images';

export const ZoneSelectionPageWrapper = styled.div`
    background-color: white !important;
`;

export const ZonesContainer = styled.div`
    padding-bottom: 50px;
`;

export const NavigateIcon = styled(IonIcon)`
    font-size: 30px;
    vertical-align: middle;
`;

export const ZoneSelectionHeader = styled.div`
    padding-top: 25px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 350px;
    margin-bottom: 16px;
    background: url(${Zone_Selection_Header});
    background-size: 100% 100%;
    background-repeat: none;
`;

export const WelcomeMessageWrapper = styled.div`
    display: block;
    margin: 0 auto;
    max-width: 80;
`;

export const WelcomeMessage = styled.h1`
    font-size: 2.8em;
    line-height: 1em;
    font-weight: 900;
    text-align: center;
    margin: 0 auto;
    color: white;
`;

export const SubHeader = styled.h4`
    font-size: 1.4em;
    font-weight: 400;
    text-align: center;
    margin: 15px;
    color: white;
`;

export const LogoWrapper = styled.div`
    display: flex;
    margin: 0 auto;
`;

export const LogoSmall = styled(IonIcon)`
    font-size: 35px;
    vertical-align: middle;
    display: flex;
    margin: 0 auto;
`;

export const Fanzone = styled.span`
    color: #ff7000;
`;

export const DiscoverButton = styled.button`
    position: fixed;
    bottom: 25px;
    padding: 0;
    left: calc(50% - 24px);
    width: 45px;
    height: 52px;
    box-shadow: 0px 1px 3px 0px black;
    outline: none;
    background-color: white;

    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);

    &::before {
        content: '';
        position: absolute;
        left: 2%;
        top: 2%;
        width: 96%;
        height: 96%;
        background: var(--ion-color-primary);
        clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    }

    svg {
        position: relative;
    }
`;
