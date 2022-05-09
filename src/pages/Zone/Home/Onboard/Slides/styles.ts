import { IonButton, IonCheckbox, IonImg, IonInput, IonLabel, IonSlide } from '@ionic/react';
import styled from 'styled-components';

export const StyledSlide = styled(IonSlide)`
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
    --background: var(--ion-background-color);
    --bullet-background: var(--ion-background-color);
`;

export const StyledSlideHeader = styled.h1`
    font-size: 17px;
    font-weight: 500;
    margin: 30px 0;
`;

export const StyledLogo = styled(IonImg)`
    height: 60px;
    margin-bottom: 50px;
`;

export const StyledInput = styled(IonInput)`
    flex: unset;
    margin-bottom: 10px;
    border: 1px solid var(--ion-color-medium);
    border-radius: 10px;

    &.has-focus {
        border-color: rgb(255 129 1 / 30%);
    }
`;

export const FieldInfo = styled.p`
    color: var(--ion-color-medium);
    font-size: 12px;
    font-weight: 400;
`;

export const List = styled.ul`
    width: 100%;
    list-style: none;
    padding: 0 20px;
    white-space: nowrap;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
`;

export const ListItem = styled.li<{ selected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 10px;
    padding: 15px;
    background: white;
    cursor: pointer;
    border-radius: 3px;
    scroll-snap-align: center;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border: 1px solid ${({ selected }) => (selected ? '#ff8101' : 'white')};
`;

export const ListItemImage = styled(IonImg)`
    width: 80%;
    height: 100px;
    border-radius: 15px;
    margin-bottom: 15px;
`;

export const ListItemLabel = styled(IonLabel)`
    color: black;
    font-size: 16;
    font-weight: 500;
`;

export const StyledCheckbox = styled(IonCheckbox)`
    --background: white;
    position: absolute;
    top: 13px;
    right: 13px;
`;

export const WellcomeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 15px;
`;

export const WellcomeMessage = styled.p`
    width: 80%;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 100px;
    text-align: center;
`;

export const WellcomeInfo = styled.p`
    width: 80%;
    font-size: 17px;
    font-weight: 400;
    text-align: center;
`;

export const WellcomeNextButton = styled(IonButton)`
    width: 100%;
`;
