import React from 'react';
import { IonCol, IonGrid, IonRow, IonToggle } from '@ionic/react';
import { AccountSettingsAccordion } from 'src/features/userData/AccountsSettingsPageWrapper';

export const NotificationSettings: React.FC = () => {
    return (
        <AccountSettingsAccordion title="Notifications">
            <IonGrid>
                <IonRow>
                    <IonCol>Sounds</IonCol>
                    <IonCol>
                        <IonToggle />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>I want to be notified for</IonCol>
                    <IonCol>
                        <IonToggle /> All
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonToggle /> Notification 1
                </IonRow>
                <IonRow>
                    <IonToggle /> Notification 2
                </IonRow>
                <IonRow>
                    <IonToggle /> Notification 3
                </IonRow>
                <IonRow>
                    <IonToggle /> Notification 4
                </IonRow>
            </IonGrid>
        </AccountSettingsAccordion>
    );
};
