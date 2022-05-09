import React from 'react';
import { IonAvatar } from '@ionic/react';
import { AccountSettingsAccordion } from 'src/features/userData/AccountsSettingsPageWrapper';
import { Button } from 'src/components';

export const InviteFriends: React.FC = () => {
    return (
        <AccountSettingsAccordion title="Invite friends">
            <p>Friends who accepted your invitation</p>
            <IonAvatar>
                <img
                    alt="a friend"
                    src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                />
            </IonAvatar>
            <p>Invite more friends</p>
            <input type="text" /> <Button>Copy</Button>
        </AccountSettingsAccordion>
    );
};
