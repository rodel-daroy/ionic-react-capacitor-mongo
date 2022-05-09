import { IMetaCard } from 'src/features/cards/types';

export interface INestedField<K extends keyof IMetaCard, F extends keyof IMetaCard[K] = keyof IMetaCard[K]> {
    field: F;
    value: IMetaCard[K][F];
}

export type INestedValue<K extends keyof IMetaCard> = {
    [key in keyof IMetaCard[K]]: IMetaCard[K][key];
};

export type SetFilter = <K extends keyof IMetaCard>(
    columnId: K,
    updater:
        | ((filterValue: Partial<IMetaCard[K]>) => IMetaCard[K] | Partial<IMetaCard[K]> | undefined)
        | IMetaCard[K]
        | Partial<IMetaCard[K]>
        | string // TODO: This needs to be removed and cardStats filter improved to work for arrays
        | undefined,
) => void;

type Filter<T, K extends keyof T = keyof T> = {
    id: K;
    value: T[K] | undefined;
};

export type SetAllFilters = (
    updater: Filter<IMetaCard>[] | ((filters: Filter<IMetaCard>[]) => Filter<IMetaCard>[]),
) => void;
