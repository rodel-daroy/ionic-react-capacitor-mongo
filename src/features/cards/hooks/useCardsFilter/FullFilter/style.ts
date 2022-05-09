import { IonButton, IonContent, IonFooter, IonItem, IonItemGroup, IonModal } from '@ionic/react';
import styled from 'styled-components';

export const StyledWrapper = styled(IonModal)`
    --background: #252525;
    --min-height: 100%;
    color: white;

    .ion-page {
        padding: 30px 0 0;
        justify-content: flex-start;
    }
`;
export const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const StyledContent = styled(IonContent)``;

export const StyledFooter = styled(IonFooter)`
    padding-top: 4px;
`;

export const StyledTitle = styled.h2`
    font-size: 17px;
    font-weight: bold;
`;
export const StyledClose = styled.div`
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
`;
export const StyledSelectFilters = styled(IonItemGroup)`
    margin-bottom: 50px;
`;
export const StyledQuickFilterGroup = styled.div`
    margin: 0 20px 50px;
`;

export const StyledQuickFilterGroupTitle = styled.h3`
    font-size: 17px;
    font-weight: bold;
`;
export const StyledButton = styled(IonButton)`
    margin: auto 20px 0;
    border: 1px solid white;
    border-radius: 10px;
    text-transform: none;
    font-weight: bold;
    height: 45px;
    --padding-top: 12px;
    --padding-bottom: 12px;
    --background: transparent;
`;

export const StyledReset = styled.div`
    text-decoration: underline;
    color: #757575;
    font-size: 14px;
    margin: 15px auto;
    cursor: pointer;
    text-align: center;
`;

export const StyledItem = styled(IonItem)`
    ::part(native) {
        --inner-border-width: 0;
    }
    margin-bottom: 30px;
`;
