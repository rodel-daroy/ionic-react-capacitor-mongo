import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { RootState } from 'src/boot/types';
import { updateUserData } from 'src/features/userData/userDataSlice';
import { Button } from '../../../components/Button';

const isValidEmail = (email: string) => {
    // eslint-disable-next-line no-control-regex,security/detect-unsafe-regex
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regex.test(email);
};

const isValidPhoneNumber = (phoneNumber: string) => {
    const regex = /^\+?[0-9]+$/;
    return regex.test(phoneNumber);
};

export const SecuritySettings: React.FC = () => {
    const { me: user } = useSelector((state: RootState) => state.userData);
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>(user?.email || '');
    const [error, setError] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>(user?.phoneNumber || '');

    useEffect(() => {
        if (user) setEmail(user.email);
    }, [user]);

    const handleSave = useCallback(() => {
        if (!isValidEmail(email)) {
            return setError('Please enter a valid email');
        }
        if (!isValidPhoneNumber(phoneNumber)) {
            return setError('Please enter a valid phone number');
        }
        setError('');
        void dispatch(updateUserData({ phoneNumber, email }));
    }, [phoneNumber, email, dispatch]);

    return (
        <div>
            <p>Account security</p>
            <IonGrid>
                <IonRow>
                    <IonCol>Phone</IonCol>
                    <IonCol>
                        <input onInput={(e) => setPhoneNumber(e.currentTarget.value)} type="text" value={phoneNumber} />
                    </IonCol>
                    <IonCol>
                        <Button onClick={handleSave}>Save</Button>
                    </IonCol>
                </IonRow>
                {error}
            </IonGrid>
        </div>
    );
};
