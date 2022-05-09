import { IonToolbar, IonTitle } from '@ionic/react';
import styled from 'styled-components';

export const StyledCollectHeader = styled(IonToolbar)`
    display: flex;
    align-items: center;
    height: 54px;
    padding: 12px;
    &:after {
        background-image: unset;
    }

    ion-segment {
        border: 1px solid #595959;
    }
    ion-segment-button {
        --indicator-color: #595959;
    }
`;

export const StyledCollectHeaderTitle = styled(IonTitle)`
    position: relative;
    text-align: left;
    padding: 0 50px 0 0;
    font-size: 24px;
    font-weight: 600;
`;
