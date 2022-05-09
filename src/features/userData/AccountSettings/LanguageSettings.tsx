import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IonCol, IonGrid, IonLabel, IonRow, IonSelectOption } from '@ionic/react';
import { RootState } from 'src/boot/types';
import { updateUserData } from '../userDataSlice';
import { Button } from '../../../components/Button';
import { AccountSettingsSelect } from './style';

export const LanguageSettings: React.FC = () => {
    const { me: user } = useSelector((state: RootState) => state.userData);
    const dispatch = useDispatch();

    const [preferredLanguage, setPreferredLanguage] = useState<string>(user?.preferredLanguage || 'en');

    useEffect(() => {
        if (user?.preferredLanguage) setPreferredLanguage(user.preferredLanguage);
    }, [user]);

    const handleSave = useCallback(() => {
        void dispatch(updateUserData({ preferredLanguage }));
    }, [preferredLanguage, dispatch]);

    return (
        <IonGrid>
            <IonRow>
                <IonLabel>Language Settings</IonLabel>
            </IonRow>
            <IonRow>
                <IonCol>Language</IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <AccountSettingsSelect
                        placeholder={preferredLanguage}
                        onIonChange={(e) => setPreferredLanguage(e.detail.value)}
                        value={preferredLanguage}
                    >
                        <IonSelectOption value="en">English</IonSelectOption>
                    </AccountSettingsSelect>
                </IonCol>
                <IonCol>
                    <Button onClick={handleSave}>Save</Button>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};
