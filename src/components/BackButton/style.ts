import { IonButton, IonIcon } from '@ionic/react';
import styled from 'styled-components';

export const StyledBackButton = styled(IonButton)`
    ::part(native) {
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover::after {
            background: transparent;
        }
    }
`;
export const StyledBackIcon = styled(IonIcon)`
    font-size: 2.2rem;
    margin-left: -6px;
    color: inherit;
`;

export const StyledLabel = styled.span``;
