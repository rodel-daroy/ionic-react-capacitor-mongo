import { IonButtons } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectCardById, selectMetaCardById, selectOwnedCardsByMetaCardId } from 'src/features/cards/cardsSlice';
import { addBookmarkedCard, removeBookmarkedCard } from 'src/features/userData';
import {
    CardHeaderTitle,
    CardHeader,
    CardHeaderDetails,
    CardImg,
    CardHeaderActions,
    CardLikesLabel,
    CardLikeTick,
    CardMintLabel,
    CardMintValue,
    CardSubTitle,
} from './style';

interface IProps {
    metaCardId: string;
    cardId?: string;
}
export const CardTitle: React.FC<IProps> = ({ metaCardId, cardId }: IProps) => {
    const dispatch = useDispatch();
    const card = useSelector((state: RootState) => (cardId ? selectCardById(state, cardId) : null));
    const metaCard = useSelector((state: RootState) => selectMetaCardById(state, metaCardId));
    const mints = useSelector((state: RootState) => selectOwnedCardsByMetaCardId(state, metaCardId).length);

    const handleLike = useCallback(() => {
        if (!metaCard) return;

        metaCard.userSpecificFields.bookmarked
            ? dispatch(removeBookmarkedCard(metaCardId))
            : dispatch(addBookmarkedCard(metaCardId));
    }, [metaCard, dispatch, metaCardId]);

    return metaCard ? (
        <CardHeader>
            <CardHeaderDetails>
                <CardHeaderTitle>{metaCard.title}</CardHeaderTitle>
                <CardSubTitle>{metaCard.cardStats.find((stat) => stat.name === 'position')?.value}</CardSubTitle>
                <CardMintLabel>Mints({mints})</CardMintLabel>
                <CardMintValue>{card?.mintNumber}</CardMintValue>
            </CardHeaderDetails>
            <CardImg src={metaCard.imageUrl} />
            <CardHeaderActions>
                <IonButtons slot="end">
                    <CardLikesLabel>0 Liked</CardLikesLabel>
                    <CardLikeTick
                        onClick={handleLike}
                        icon={metaCard.userSpecificFields.bookmarked ? heart : heartOutline}
                    ></CardLikeTick>
                </IonButtons>
            </CardHeaderActions>
        </CardHeader>
    ) : (
        <CardHeader />
    );
};
