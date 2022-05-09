import { createEntityAdapter } from '@reduxjs/toolkit';
import { ICard, IMetaCard } from '../types';

/**
 * **************
 *    ENTITIES
 * **************
 * We are using the createEntityAdapter since it provides us with pre-built functionality
 */
export const cardsAdapter = createEntityAdapter<ICard>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => a.mintNumber - b.mintNumber,
});

export const metaCardsAdapter = createEntityAdapter<IMetaCard>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => a.tier - b.tier,
});
