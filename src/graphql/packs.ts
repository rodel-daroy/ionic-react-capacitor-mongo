import gql from 'graphql-tag';
import { IPack, IMetaPack } from 'src/features/packs/types';
import { createQuery } from './createQuery';

const PackFragment = gql`
    fragment Pack_Pack on Pack {
        _id
        opened
        _card_ids
    }
`;

const UserFragment = gql`
    fragment Pack_User on Pack {
        user: _user_id {
            _id
            username
        }
    }
`;

const MetaPackFragment = gql`
    fragment MetaPack_MetaPack on MetaPack {
        _id
        cost {
            currency
            value
        }
        edition
        imageUrl
        cardsInPack
        packsQty
        name
        type
    }
`;

const GetMetaPacks = gql`
    query GetMetaPacks {
        metaPacks {
            ...MetaPack_MetaPack
        }
    }
    ${MetaPackFragment}
`;

const GetPackById = gql`
    query GetPackById($packId: ObjectId!) {
        pack(query: { _id: $packId }) {
            ...Pack_Pack
            ...Pack_User
            metaPack: _metaPack_id {
                ...MetaPack_MetaPack
            }
        }
    }
    ${PackFragment}
    ${UserFragment}
    ${MetaPackFragment}
`;

const GetPacksById = gql`
    query GetPacksById($packIds: [ObjectId]!) {
        packs(query: { _id_in: $packIds }) {
            ...Pack_Pack
            ...Pack_User
            metaPack: _metaPack_id {
                ...MetaPack_MetaPack
            }
        }
    }
    ${PackFragment}
    ${UserFragment}
    ${MetaPackFragment}
`;

const GetPacksByOwner = gql`
    query GetPacksByOwner($ownerId: ObjectId!) {
        packs(query: { _user_id: { _id: $ownerId }, opened: false }) {
            ...Pack_Pack
            ...Pack_User
            metaPack: _metaPack_id {
                ...MetaPack_MetaPack
            }
        }
    }
    ${PackFragment}
    ${UserFragment}
    ${MetaPackFragment}
`;

const GetMetaPacksByEdition = gql`
    query GetMetaPacksByEdition($editionId: Number!) {
        metaPacks(query: { edition: $editionId }) {
            ...MetaPack_MetaPack
        }
    }
    ${MetaPackFragment}
`;

const GetOwnedPacksByMetaPackIds = gql`
    query GetOwnedPacksByMetaPackIds($ownerId: ObjectId!, $metaPackIds: [ObjectId]!) {
        packs(
            query: { _metaPack_id: { _id_in: $metaPackIds }, _user_id: { _id: $ownerId }, opened: false }
            limit: 10000
        ) {
            metaPack: _metaPack_id {
                _id
            }
            ...Pack_Pack
            ...Pack_User
        }
    }
    ${PackFragment}
    ${UserFragment}
`;

/** Fetches oall metaPacks
 *  Includes all related resources
 */
const fetchMetaPacks = createQuery<void, { metaPacks: IMetaPack[] }>({
    query: GetMetaPacks,
});
/** Fetches one pack by packId: _id
 *  Includes all related resources
 */
const fetchPackById = createQuery<{ packId: string }, { pack: IPack }>({
    query: GetPackById,
});

/** Fetches multiple packs by packId: _id
 *  Includes all related resources
 */
const fetchPacksByIds = createQuery<{ packIds: string[] }, { packs: IPack[] }>({
    query: GetPacksById,
});

/** Fetches multiple packs by owner: _userId
 *  Includes all related resources
 */
const fetchPacksByOwner = createQuery<{ ownerId: string }, { packs: IPack[] }>({
    query: GetPacksByOwner,
});

/** Fetches multiple packs by edition: editionId
 *  Includes all related resources
 */
const fetchMetaPacksByEdition = createQuery<{ editionId: string }, { metaPacks: IMetaPack[] }>({
    query: GetMetaPacksByEdition,
});

const fetchOwnedPacksByMetaPackIds = createQuery<{ ownerId: string; metaPackIds: string[] }, { packs: IPack[] }>({
    query: GetOwnedPacksByMetaPackIds,
});

export const packApi = {
    fetchMetaPacks,
    fetchPackById,
    fetchPacksByIds,
    fetchPacksByOwner,
    fetchMetaPacksByEdition,
    fetchOwnedPacksByMetaPackIds,
};
