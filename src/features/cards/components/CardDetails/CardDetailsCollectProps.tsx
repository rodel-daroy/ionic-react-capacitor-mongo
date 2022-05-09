import { SerializedError } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useAppDispatch } from 'src/boot/store';
import { RootState } from 'src/boot/types';
import { STATUS } from 'src/utility';
import {
    fetchOwnedCardsByMetaCardIds,
    selectMetaCardById,
    selectOwnedCardIdsByMetaCardId,
} from 'src/features/cards/cardsSlice';
import { IMetaCard } from '../../types';

export interface ICardDetailsCollectProps {
    cardIds: string[];
    metaCardId: string;
    status: STATUS;
    metaCard: IMetaCard | undefined;
    buttonText: string;
    error?: Error | SerializedError | null;
}

type IProps = RouteComponentProps<{ metaCardId: string }>;
export const CardDetailsCollectProps = ({ match }: IProps): ICardDetailsCollectProps => {
    const { metaCardId } = match.params;

    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.userData.me);
    const metaCard = useSelector((state: RootState) => selectMetaCardById(state, metaCardId));
    const cardIds = useSelector((state: RootState) => selectOwnedCardIdsByMetaCardId(state, metaCardId));
    const error = useSelector((state: RootState) => state.cards.cards.error);
    const statusCard = useSelector((state: RootState) => state.cards.cards.status);
    const statusMetaCard = useSelector((state: RootState) => state.cards.metaCards.status);
    const [status, setStatus] = useState<STATUS>(STATUS.LOADING);

    /**
     * If Card is owned but not onSale -> Sell
     * If Card is owned and on onSale -> Withdraw
     * If Card is owned and being set onSale -> Done
     * If MetaCard is not owned -> More Sellers
     * If Card is not owned -> Send offer
     */
    const buttonText = 'Sell';

    /** Fetch latest version of card (might use apollo-cache)
     * (IMPORTANT: We need to make sure that MetaCard is also fetched when Card is fetched!)
     */
    useEffect(() => {
        if (metaCardId && user) {
            void dispatch(fetchOwnedCardsByMetaCardIds([metaCardId]));
        }
    }, [dispatch, metaCardId, user]);

    useEffect(() => {
        if ([statusCard, statusMetaCard].includes(STATUS.LOADING)) {
            return setStatus(STATUS.LOADING);
        }
        if ([statusCard, statusMetaCard].includes(STATUS.FAILED)) {
            return setStatus(STATUS.FAILED);
        }
        if (
            [STATUS.IDLE, STATUS.SUCCESSFUL].includes(statusCard) &&
            [STATUS.IDLE, STATUS.SUCCESSFUL].includes(statusMetaCard)
        ) {
            return setStatus(STATUS.SUCCESSFUL);
        }
    }, [statusCard, statusMetaCard, setStatus]);

    return {
        metaCardId,
        status,
        metaCard,
        cardIds,
        error,
        buttonText,
    };
};
