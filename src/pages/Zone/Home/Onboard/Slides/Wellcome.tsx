import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { WellcomeContent, WellcomeInfo, WellcomeMessage, WellcomeNextButton } from './styles';

interface IProps {
    onNext: () => void;
}
export const Wellcome: React.FC<IProps> = ({ onNext }: IProps) => {
    return (
        <IonPage>
            <IonContent>
                <WellcomeContent>
                    <WellcomeMessage>Well done! You entered FANZONE</WellcomeMessage>
                    <WellcomeInfo>
                        What’s next? Personalize your account and open your first free pack of cards!
                    </WellcomeInfo>
                    <WellcomeNextButton onClick={onNext}>Next</WellcomeNextButton>
                </WellcomeContent>
            </IonContent>
        </IonPage>
    );
};
