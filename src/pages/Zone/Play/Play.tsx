import React, { useEffect } from 'react';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { Header, selectCurrentZone } from 'src/features';
import { useSelector } from 'react-redux';

const Play: React.FC = () => {
    const router = useIonRouter();
    const currentZone = useSelector(selectCurrentZone);

    useEffect(() => {
        if (!currentZone) router.push('/');
    }, [currentZone, router]);

    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <div>COMING SOON...</div>
            </IonContent>
        </IonPage>
    );
};

export default Play;
