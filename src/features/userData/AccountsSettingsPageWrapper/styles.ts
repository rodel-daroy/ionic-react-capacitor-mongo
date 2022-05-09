import styled from 'styled-components';
import { IonIcon } from '@ionic/react';

export const StyledToggle = styled(IonIcon)<{ isOpen: boolean }>`
    transform: ${({ isOpen }) => (isOpen ? '' : 'rotateZ(180deg)')};
    transition: transform 120ms ease;
    font-size: 32px;
    flex-shrink: 0;
`;
