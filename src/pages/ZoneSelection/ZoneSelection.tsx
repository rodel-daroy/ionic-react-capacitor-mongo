import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Header, ZoneSelection as Selection } from 'src/features/appData';

const ZoneSelection: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent>
                <Selection />
            </IonContent>
        </IonPage>
    );
};

export default ZoneSelection;
