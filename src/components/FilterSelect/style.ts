import { IonItem } from '@ionic/react';
import styled from 'styled-components';

export const StyledItem = styled(IonItem)`
    --color: inherit;

    ::part(native) {
        background: transparent;
        padding-left: 20px;
    }
`;
