import React, { useCallback } from 'react';
import { useAppDispatch } from 'src/boot/store';
import { IonButton, IonButtons, IonHeader, IonItem, IonList, IonToolbar, useIonRouter } from '@ionic/react';
import { logOutUser } from 'src/features/userData/userDataSlice';
import { FormattedMessage } from 'react-intl';
import { LanguageSettings, SecuritySettings, UserProfileSettings } from '../AccountSettings';
import { ContactAndHelp } from '../AccountSettings/ContactAndHelp';
import { BackButton } from 'src/components';
import { StyledPage } from './style';

const AccountSettingsDrawer: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useIonRouter();

    const logout = useCallback(() => {
        void dispatch(logOutUser()).finally(() => router.push('/login'));
    }, [dispatch, router]);

    const handleClose = useCallback(() => {
        router.push(router.routeInfo.lastPathname || '/', 'back');
    }, [router]);

    return (
        <StyledPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <BackButton onClick={handleClose} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonList>
                <IonItem>
                    <UserProfileSettings />
                </IonItem>
                <IonItem>
                    <LanguageSettings />
                </IonItem>
                <IonItem>
                    <SecuritySettings />
                </IonItem>
                <IonItem>
                    <ContactAndHelp />
                </IonItem>
                <IonItem>
                    <a href="https://intercom.help/fanzone-media/en/">FAQ</a> &nbsp;
                    <a href="https://www.fanzone.media/imprint">Imprint</a>&nbsp;
                    <a href="https://www.fanzone.media/terms-conditions#TermsEN">Terms of use</a>&nbsp;
                    <a href="https://www.fanzone.media/privacy-policy#PrivacyEN">Privacy Policy</a>&nbsp;
                </IonItem>
            </IonList>
            <IonButton onClick={logout}>
                <FormattedMessage description="Logout button text" defaultMessage="Logout" />
            </IonButton>
        </StyledPage>
    );
};

export default AccountSettingsDrawer;
