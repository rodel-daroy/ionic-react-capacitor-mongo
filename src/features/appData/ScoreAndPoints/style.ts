import { IonIcon } from '@ionic/react';
import styled from 'styled-components';

export const StyledScore = styled.div`
    margin: 0 8px;
    height: 22px;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
`;

export const StyledCoins = styled.div`
    margin: 0 8px;
    height: 22px;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
`;

export const StyledIcon = styled(IonIcon)`
    margin-right: 6px;
    font-size: 18px;
`;

export const StyledCircle = styled.div`
    border-radius: 999px;
    border: 2px solid white;
    background-color: transparent;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
`;
export const StyledDot = styled.div`
    border-radius: 999px;
    background-color: white;
    width: 10px;
    height: 10px;
`;

export const StyledValue = styled.div`
    display: inline-block;
    background: linear-gradient(140deg, rgb(200, 200, 200), rgb(150, 150, 150));
    min-width: 50px;
    height: 100%;
    height: 1em;
`;
