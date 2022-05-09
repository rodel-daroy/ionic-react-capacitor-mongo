import React, { useCallback, useEffect, useState } from 'react';
import { IonAvatar, IonRow, IonText, IonGrid, IonIcon, useIonRouter } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { useAppDispatch } from 'src/boot/store';
import { ICard } from '../../cards/types';
import { fetchCardsByOwner, selectOwnedCards } from '../../cards/cardsSlice';
import { UsernameDrawer } from './UsernameDrawer';
import { StyledDot } from './style';
import { star } from 'ionicons/icons';
import { selectCurrentZone } from '../../appData';

export const UserProfileSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const { push } = useIonRouter();

    const { me: user } = useSelector((state: RootState) => state.userData);
    const cards: ICard[] = useSelector(selectOwnedCards);
    const currentZone = useSelector(selectCurrentZone);

    const [showEditUsername, setShowEditUsername] = useState<boolean>(false);

    const navigateToShop = useCallback(() => {
        if (!currentZone?.name) return;
        push(`/zone/${currentZone._id}/shop/tokens`);
    }, [push, currentZone]);

    const userId = user?._id;

    useEffect(() => {
        if (!userId) return;
        void dispatch(fetchCardsByOwner(userId));
    }, [userId, dispatch]);

    const collectionValue = cards.reduce((sum, card) => sum + card.price, 0);

    return (
        <div>
            <IonGrid>
                <IonRow className="ion-justify-content-center">
                    <div>
                        <IonAvatar>
                            <img
                                alt="yourself"
                                src={
                                    user?.media?.profilePhoto
                                        ? user?.media?.profilePhoto
                                        : 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
                                }
                            />
                        </IonAvatar>
                        <p onClick={() => setShowEditUsername(true)}>@{user?.username}</p>
                        <div>Collection value {collectionValue} Fzn</div>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>Reward Points</p>
                            <p>
                                <IonIcon icon={star} />
                                {user?.points || 0}
                            </p>
                        </div>
                        <div onClick={navigateToShop}>
                            <p style={{ fontWeight: 'bold' }}>Fanzone Credit</p>
                            <p>
                                <StyledDot />
                                {user?.coins || 0} Fzn
                            </p>
                        </div>
                    </div>
                </IonRow>
                <IonRow>
                    <IonText>{user?.bio}</IonText>
                </IonRow>
            </IonGrid>
            <UsernameDrawer isOpen={showEditUsername} onClose={() => setShowEditUsername(false)} />
        </div>
    );
};
