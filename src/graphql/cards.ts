import gql from 'graphql-tag';
import { ICard, ICardQueryInput, IMetaCard, IMetaCardQueryInput, IUpdateCardInput } from 'src/features/cards/types';
import { createMutation } from './createMutation';
import { createQuery } from './createQuery';

const CardFragment = gql`
    fragment Card_Card on Card {
        _id
        onSale
        price
        mintNumber
        points
        previousOwners {
            _user_id
            transferDate
            transferType
            purchasePrice
        }
        effects {
            name
            type
            value
        }
    }
`;

const UserFragment = gql`
    fragment Card_User on Card {
        user: _user_id {
            _id
            username
        }
    }
`;

const MetaCardFragment = gql`
    fragment MetaCard_MetaCard on MetaCard {
        _id
        userSpecificFields {
            owned
            onSaleByMe
            onSaleByOthers
            bookmarked
        }
        cardType
        season
        cardStats {
            name
            value
            type
        }
        tier
        scoreMin
        scoreMax
        scoreCalc
        batch
        batchMax
        title
        subtitle
        description
        edition
        editionCategory
        editionSet
        amount
        circulation
        priceMin
        priceMax
        priceAvg
        priceSuggested
        imageUrl
        image: _image_id {
            _id
            path
            mediaType
            mimeType
            name
            category
        }
        imageBack: _imageBack_id {
            _id
            path
            mediaType
            mimeType
            name
            category
        }
        video: _video_id {
            _id
            path
            mediaType
            mimeType
            name
            category
        }
        exclusive: _exclusive_id {
            _id
            path
            mediaType
            mimeType
            name
            category
        }
        creator: _creator_id {
            _id
            username
        }
        owner: _owner_id {
            _id
            username
        }
        zones: _zone_ids {
            _id
            _ancestor_ids {
                _id
            }
            name
            description
            location
            insigniaImageUrl
            rank
        }
        profile: _profile_id {
            _id
            username
        }

        translations: _translations_id {
            _id
            _relation_id
            relationType
            items {
                id
                value
            }
        }
    }
`;

const GetCardById = gql`
    query GetCardById($cardId: ObjectId!) {
        card(query: { _id: $cardId }) {
            ...Card_Card
            metaCard: _metaCard_id {
                ...MetaCard_MetaCard
            }
            ...Card_User
        }
    }
    ${CardFragment}
    ${UserFragment}
    ${MetaCardFragment}
`;

const GetCardsById = gql`
    query GetCardsById($cardIds: [ObjectId]!) {
        cards(query: { _id_in: $cardIds }) {
            ...Card_Card
            metaCard: _metaCard_id {
                ...MetaCard_MetaCard
            }
            ...Card_User
        }
    }
    ${CardFragment}
    ${UserFragment}
    ${MetaCardFragment}
`;

const GetCardsByFilter = gql`
    query GetCardsByFilter($limit: Int, $filter: CardQueryInput!) {
        cards(limit: $limit, query: $filter) {
            ...Card_Card
            metaCard: _metaCard_id {
                ...MetaCard_MetaCard
            }
            ...Card_User
        }
    }
    ${CardFragment}
    ${UserFragment}
    ${MetaCardFragment}
`;

const GetMetaCardsByFilter = gql`
    query GetMetaCardsByFilter($filter: MetaCardQueryInput!) {
        metaCards(query: $filter) {
            ...MetaCard_MetaCard
        }
    }
    ${MetaCardFragment}
`;

const GetCardsByOwner = gql`
    query GetCardsByOwner($ownerId: ObjectId!) {
        cards(query: { _user_id: { _id: $ownerId } }) {
            ...Card_Card
            metaCard: _metaCard_id {
                ...MetaCard_MetaCard
            }
            ...Card_User
        }
    }
    ${CardFragment}
    ${UserFragment}
    ${MetaCardFragment}
`;

const GetOwnedCardsByMetaCardId = gql`
    query GetOwnedCardsByMetaCardId($ownerId: ObjectId!, $metaCardIds: [ObjectId]!) {
        cards(query: { _metaCard_id: { _id_in: $metaCardIds }, _user_id: { _id: $ownerId } }, limit: 50000) {
            metaCard: _metaCard_id {
                ...MetaCard_MetaCard
            }
            ...Card_Card
            ...Card_User
        }
    }
    ${CardFragment}
    ${UserFragment}
    ${MetaCardFragment}
`;

const GetMetaCards = gql`
    query GetMetaCards {
        metaCards {
            ...MetaCard_MetaCard
        }
        cards {
            _metaCard_id {
                _id
            }
        }
    }
    ${MetaCardFragment}
`;

const GetMetaCardById = gql`
    query GetMetaCardById($metaCardId: ObjectId!) {
        metaCard(query: { _id: $metaCardId }) {
            ...MetaCard_MetaCard
        }
    }
    ${MetaCardFragment}
`;

const GetMetaCardsByEdition = gql`
    query GetMetaCardsByEdition($editionId: String!) {
        metaCards(query: { edition: $editionId }) {
            ...MetaCard_MetaCard
        }
    }
    ${MetaCardFragment}
`;

const GetUserSpecificMetaCardData = (metaCardIds: string[]) => {
    const queries = metaCardIds
        .map(
            (id) => `
                metaCard_${id}: card(query: { _metaCard_id: { _id: "${id}" }, _user_id: { _id: $userId } }) {
                    _id
                }
                metaCard_${id}_onSaleByMe: card(query: { _metaCard_id: { _id: "${id}" }, onSale: true, _user_id: { _id: $userId } }) {
                    _id
                }
                metaCard_${id}_onSaleByOthers: card(query: { _metaCard_id: { _id: "${id}" }, onSale: true, _user_id: { _id_ne: $userId } }) {
                    _id
                }`,
        )
        .join('\n');

    return gql`
        query GetUserSpecificMetaCardData($userId: ObjectId!) {
            ${queries}
        }`;
};

const UpdateCardById = gql`
    mutation UpdateCardById($query: CardQueryInput!, $updates: CardUpdateInput!) {
        card: updateOneCard(set: $updates, query: $query) {
            ...Card_Card
            metaCard: _metaCard_id {
                ...MetaCard_MetaCard
            }
        }
    }
    ${CardFragment}
    ${MetaCardFragment}
`;
const UpdateCardsByIds = gql`
    mutation UpdateCardsByIds($query: CardQueryInput!, $updates: CardUpdateInput!) {
        card: updateManyCards(set: $updates, query: $query) {
            ...Card_Card
            metaCard: _metaCard_id {
                ...MetaCard_MetaCard
            }
        }
    }
    ${CardFragment}
    ${MetaCardFragment}
`;

/** Fetches one card by cardId: _id
 *  Includes all related resources
 */
const fetchCardById = createQuery<{ cardId: string }, { card: ICard }>({
    query: GetCardById,
});

/** Fetches multiple cards by cardId: _id
 *  Includes all related resources
 */
const fetchCardsByIds = createQuery<{ cardIds: string[] }, { cards: ICard[] }>({
    query: GetCardsById,
});

/** Fetches multiple cards by cardId: _id
 *  Includes all related resources
 */
const fetchCardsByFilter = createQuery<{ filter: ICardQueryInput; limit: number }, { cards: ICard[] }>({
    query: GetCardsByFilter,
});

const fetchMetaCardsByFilter = createQuery<
    { filter: IMetaCardQueryInput },
    { metaCards: Omit<IMetaCard, 'owned' | 'onSaleByMe' | 'bookmarked'>[] }
>({
    query: GetMetaCardsByFilter,
});

/** Fetches multiple cards by owner: _userId
 *  Includes all related resources
 */
const fetchCardsByOwner = createQuery<{ ownerId: string }, { cards: ICard[] }>({
    query: GetCardsByOwner,
});

/** Fetches one metaCard by metaCardId: _id
 *  Includes all related resources
 */
const fetchMetaCardById = createQuery<
    { metaCardId: string },
    { metaCard: Omit<IMetaCard, 'owned' | 'onSaleByMe' | 'bookmarked'> }
>({
    query: GetMetaCardById,
});

/** Fetches multiple MetaCards by edition: editionId
 *  Includes all related resources
 */
const fetchMetaCardsByEdition = createQuery<
    { editionId: string },
    { metaCards: Omit<IMetaCard, 'owned' | 'onSaleByMe' | 'bookmarked'>[] }
>({
    query: GetMetaCardsByEdition,
});

const fetchMetaCards = createQuery<void, { metaCards: IMetaCard[]; cards: Array<{ _metaCard_id: { _id: string } }> }>({
    query: GetMetaCards,
});
const fetchUserSpecificMetaCardData = createQuery<
    { userId: string },
    { [metaCardId: string]: { owned: boolean; onSaleByMe: boolean } },
    string[]
>({
    query: (metaCardIds) => GetUserSpecificMetaCardData(metaCardIds),
});

const fetchOwnedCardsByMetaCardIds = createQuery<{ ownerId: string; metaCardIds: string[] }, { cards: ICard[] }>({
    query: GetOwnedCardsByMetaCardId,
});

const updateCard = createMutation<ICardQueryInput, { card: ICard }, { updates: IUpdateCardInput }>({
    mutation: UpdateCardById,
});
const updateCards = createMutation<ICardQueryInput, { card: ICard }, { updates: IUpdateCardInput }>({
    mutation: UpdateCardsByIds,
});

export const cardApi = {
    fetchMetaCards,
    fetchUserSpecificMetaCardData,
    fetchCardsByFilter,
    fetchMetaCardsByFilter,
    fetchOwnedCardsByMetaCardIds,
    fetchCardById,
    fetchCardsByIds,
    fetchCardsByOwner,
    fetchMetaCardById,
    fetchMetaCardsByEdition,
    updateCard,
    updateCards,
};
