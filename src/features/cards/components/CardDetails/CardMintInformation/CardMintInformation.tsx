import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'src/boot/types';
import { selectCardById, selectOwnedCardsByMetaCardId } from 'src/features/cards/cardsSlice';
import { StyledCardMintInformation } from './style';

interface IProps {
    metaCardId?: string;
    cardId?: string;
    onChange?: (cardId: string) => void;
    currentCard?: string;
}
export const CardMintInformation: React.FC<IProps> = (props: IProps) => {
    const { cardId, currentCard, metaCardId, onChange } = props;
    const owner = useSelector((state: RootState) => {
        if (!cardId) return undefined;
        const card = selectCardById(state, cardId);
        const userId = state.userData.me?._id;
        if (card?.user._id !== userId) return card?.user;
    });
    const mintNumber = useSelector((state: RootState) => cardId && selectCardById(state, cardId)?.mintNumber);

    return (
        <StyledCardMintInformation>
            {owner && <Owner {...owner} />}
            {owner && mintNumber && <Mint mintNumber={mintNumber} />}
            <OwnedMints metaCardId={metaCardId} currentCard={currentCard} onChange={onChange} />
        </StyledCardMintInformation>
    );
};

interface IOwnerProps {
    _id: string;
    username: string;
}
const Owner: React.FC<IOwnerProps> = ({ username, _id }: IOwnerProps) => (
    <span>
        <FormattedMessage description="Label of Card Owner" defaultMessage="Owner" />
        <Link to="#">
            <strong>{username}</strong>
        </Link>
    </span>
);

const Mint: React.FC<{ mintNumber: number }> = ({ mintNumber }: { mintNumber: number }) => (
    <span>
        <FormattedMessage description="Label of Card mintNumber" defaultMessage="Mint" />
        <strong>{mintNumber}</strong>
    </span>
);

interface IOwnedMintsProps {
    metaCardId?: string;
    onChange?: (cardId: string) => void;
    currentCard?: string;
}
const OwnedMints: React.FC<IOwnedMintsProps> = ({ metaCardId }: IOwnedMintsProps) => {
    const ownedMints = useSelector((state: RootState) =>
        metaCardId ? selectOwnedCardsByMetaCardId(state, metaCardId) : [],
    );

    const renderedMints = ownedMints.map((mint) => (
        <span key={mint._id}>{mint.mintNumber || 'no Mint-Number on Card!'}</span>
    ));

    return (
        <span>
            <FormattedMessage description="Label of Card MintId" defaultMessage="Mints" />
            <strong>({ownedMints.length})</strong>
            {renderedMints}
        </span>
    );
};
