import { IonLabel, IonListHeader, IonProgressBar } from '@ionic/react';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const StyledCollectionStats = styled(IonListHeader)`
    padding: 0 10px;
`;

export const StyledCount = styled(IonLabel)`
    font-size: 14px;
    font-weight: 400;
`;
export const StyledPercentage = styled(IonLabel)`
    float: right;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
`;

export const StyledCollectionProgress = styled(IonProgressBar)`
    --progress-background: var(--fanzone-orange);
    --buffer-background: rgb(255 129 1 / 30%);
    flex: 1 0 100%;
`;
