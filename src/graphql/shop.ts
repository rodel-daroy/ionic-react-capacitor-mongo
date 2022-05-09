import gql from 'graphql-tag';
import { IShopItem } from 'src/features/shop/types';
import { createQuery } from './createQuery';

const ShopItemFragment = gql`
    fragment ShopItem_ShopItem on ShopItem {
        _id
        _metaPack_id
        description
        name
        price
        type
        value
    }
`;

const GetShopItemById = gql`
    query GetShopItemById($shopItemId: ObjectId!) {
        shopItem(query: { _id: $shopItemId }) {
            ...ShopItem_ShopItem
        }
    }
    ${ShopItemFragment}
`;

const GetShopItemsByIds = gql`
    query GetShopItemsByIds($shopItemIds: [ObjectId]!) {
        shopItems(query: { _id_in: $shopItemIds }) {
            ...ShopItem_ShopItem
        }
    }
    ${ShopItemFragment}
`;

const GetAllShopItems = gql`
    query GetAllShopItems {
        shopItems {
            ...ShopItem_ShopItem
        }
    }
    ${ShopItemFragment}
`;

/** Fetches one ShopItem by shopItemId: _id
 *  Includes all data
 */
const fetchShopItemById = createQuery<{ shopItemId: string }, { shopItem: IShopItem }>({
    query: GetShopItemById,
});

/** Fetches multiple ShopItems by shopItemId: _id
 *  Includes all data
 */
const fetchShopItemsByIds = createQuery<{ shopItemIds: string[] }, { shopItems: IShopItem[] }>({
    query: GetShopItemsByIds,
});

/** Fetches all ShopItems
 *  Includes all data
 */
const fetchAllShopItems = createQuery<void, { shopItems: IShopItem[] }>({
    query: GetAllShopItems,
});

export const shopApi = {
    fetchShopItemById,
    fetchShopItemsByIds,
    fetchAllShopItems,
};
