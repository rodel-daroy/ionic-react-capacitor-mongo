import type { SerializedError, EntityState } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';
import { IUserQueryInput } from '../../userData/types';
import { IMetaCard, IMetaCardQueryInput } from './MetaCard';
export * from './MetaCard';

export interface ICard {
    _id: string;
    onSale: boolean;
    onSaleDate?: Date;
    price: number;
    mintNumber: number;
    points: number;
    user: {
        _id: string;
        username: string;
    };
    previousOwners: Array<{
        _user_id: string;
        transferDate: string;
        transferType: 'purchase' | 'promo' | 'pack' | 'gift';
        purchasePrice: number;
    }>;
    effects: Array<{
        name: string;
        type: string;
        value: string;
    }>;
    metaCard: IMetaCard;
}

export interface ICardListItem {
    metaCardId: string;
    mediaUrl: string;
    title: string;
    cards: Array<ICard>;
}

export interface ICardList {
    owned: number;
    total: number;
    items: Array<ICardListItem>;
}

interface IBaseState {
    status: STATUS;
    error: Error | SerializedError | null;
}
export type ICardsState = IBaseState;
export type IMetaCardsState = IBaseState;

export type ICardsSliceState = {
    cards: ICardsState & EntityState<ICard>;
    metaCards: IMetaCardsState & EntityState<IMetaCard>;
};

export type ICardQueryInput = Partial<{
    mintNumber_lt: number;
    createdAt_nin: string[];
    price_in: number[];
    updatedAt_lt: string;
    createdAt_gt: string;
    mintNumber_exists: boolean;
    price_lte: number;
    _user_id_exists: boolean;
    mintNumber_lte: number;
    createdAt_lte: string;
    updatedAt: string;
    _id: string;
    mintNumber_nin: number[];
    updatedAt_in: string[];
    mintNumber_gt: number;
    onSaleDate: string;
    onSaleDate_in: string[];
    onSaleDate_nin: string[];
    onSaleDate_lte: string;
    onSaleDate_gte: string;
    onSaleDate_gt: string;
    onSaleDate_lt: string;
    onSaleDate_ne: boolean;
    onSale_exists: boolean;
    _id_in: string[];
    price_ne: number;
    createdAt_ne: string;
    updatedAt_lte: string;
    updatedAt_gte: string;
    createdAt: string;
    previousOwners_nin: ICardPreviousOwnerQueryInput[];
    _id_lt: string;
    _id_gt: string;
    price_nin: number[];
    previousOwners_in: ICardPreviousOwnerQueryInput[];
    _id_lte: string;
    OR: ICardQueryInput[];
    createdAt_in: string[];
    createdAt_lt: string;
    _id_nin: string[];
    AND: ICardQueryInput[];
    price: number;
    createdAt_exists: boolean;
    effects_exists: boolean;
    price_exists: boolean;
    updatedAt_ne: string;
    mintNumber_in: number[];
    effects: ICardEffectQueryInput[];
    mintNumber_ne: number;
    previousOwners: ICardPreviousOwnerQueryInput[];
    price_gt: number;
    _id_gte: string;
    mintNumber: number;
    onSale: boolean;
    _metaCard_id_exists: boolean;
    previousOwners_exists: boolean;
    _id_exists: boolean;
    price_lt: number;
    mintNumber_gte: number;
    onSale_ne: boolean;
    updatedAt_nin: string[];
    createdAt_gte: string;
    updatedAt_exists: boolean;
    _metaCard_id: IMetaCardQueryInput;
    updatedAt_gt: string;
    effects_in: ICardEffectQueryInput[];
    price_gte: string;
    effects_nin: ICardEffectQueryInput[];
    _user_id: IUserQueryInput;
    _id_ne: string;
}>;

type ICardPreviousOwnerQueryInput = Partial<{
    transferDate_ne: string;
    purchasePrice_gt: number;
    transferDate_gt: string;
    purchasePrice_nin: string[];
    transferType_gte: string;
    transferDate_nin: string[];
    transferDate: string;
    purchasePrice_gte: number;
    _user_id_lt: string;
    purchasePrice: number;
    purchasePrice_in: number[];
    transferType_lte: string;
    transferType_lt: string;
    transferDate_exists: boolean;
    _user_id_lte: string;
    _user_id_nin: string[];
    _user_id_in: string[];
    _user_id_ne: string;
    transferType_ne: string;
    _user_id_exists: boolean;
    _user_id: string;
    _user_id_gt: string;
    AND: ICardPreviousOwnerQueryInput[];
    OR: ICardPreviousOwnerQueryInput[];
    transferDate_in: string[];
    purchasePrice_lt: number;
    transferDate_lt: string;
    transferType_gt: string;
    purchasePrice_lte: number;
    transferType_exists: boolean;
    _user_id_gte: string;
    transferDate_gte: string;
    transferType_in: string[];
    purchasePrice_ne: number;
    transferType: string;
    purchasePrice_exists: boolean;
    transferDate_lte: string;
    transferType_nin: string[];
}>;
type ICardEffectQueryInput = Partial<{
    name_in: string[];
    value_lt: string;
    value_in: string[];
    type_lt: string;
    type_ne: string;
    AND: ICardEffectQueryInput[];
    value: string;
    type_exists: boolean;
    type_lte: string;
    name_exists: boolean;
    value_lte: string;
    type_in: string[];
    value_gt: string;
    type_nin: string[];
    name_lt: string;
    name_gt: string;
    name_nin: string[];
    name_lte: string;
    value_exists: boolean;
    type_gte: string;
    value_ne: string;
    OR: ICardEffectQueryInput[];
    value_gte: string;
    type_gt: string;
    name_gte: string;
    name: string;
    value_nin: string[];
    type: string;
    name_ne: string;
}>;

export type IUpdateCardInput = Partial<{
    onSale: boolean;
    onSaleDate: string;
    onSaleDate_unset: boolean;
    price: string | number;
    mintNumber_inc: number;
    onSale_unset: boolean;
    price_unset: boolean;
    userId_unset: boolean;
    _id: string;
    metaCardId: string;
    userId: string;
    _id_unset: boolean;
    metaCardId_unset: boolean;
    mintNumber: number;
    mintNumber_unset: boolean;
}>;
