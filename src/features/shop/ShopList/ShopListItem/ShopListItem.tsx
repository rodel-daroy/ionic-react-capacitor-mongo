import { IonIcon, useIonRouter } from '@ionic/react';
import { layers } from 'ionicons/icons';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectMetaPackById } from 'src/features/packs';
import { IShopItem } from '../../types';
import { ItemWrapper, ItemImage, ItemName, ItemBadge, ItemCardsCount, ItemPrice } from './styles';

import credit from 'src/assets/images/credit.png';
import { useRouteMatch } from 'react-router';

export const ShopListItem = React.memo(function ShopListItem({ shopItem }: { shopItem: IShopItem }) {
    const { push } = useIonRouter();
    const {
        params: { zoneId, tab, segment },
    } = useRouteMatch<{ zoneId: string; tab: string; segment: string }>();
    const metaPack = useSelector(
        (state: RootState) => shopItem._metaPack_id && selectMetaPackById(state, shopItem._metaPack_id),
    );

    const openShopItem = useCallback(() => {
        const url = `/zone/${zoneId}/${tab}/${segment}/${shopItem._id}`;
        push(url, 'forward');
    }, [push, shopItem._id, zoneId, tab, segment]);

    const itemImage = shopItem.type === 'PACK' && shopItem._metaPack_id && metaPack ? metaPack.imageUrl : credit;

    const renderPackInfo = () => {
        return (
            shopItem.type === 'PACK' &&
            shopItem._metaPack_id &&
            metaPack && (
                <>
                    <ItemBadge>{metaPack.edition}</ItemBadge>
                    <ItemCardsCount>
                        <IonIcon icon={layers}></IonIcon> {metaPack.cardsInPack} CARDS
                    </ItemCardsCount>
                </>
            )
        );
    };

    return (
        <ItemWrapper id={shopItem._id} onClick={openShopItem}>
            <ItemImage src={itemImage}></ItemImage>
            <ItemName>{shopItem.name}</ItemName>
            {renderPackInfo()}
            <ItemPrice>{shopItem.price} FZC</ItemPrice>
        </ItemWrapper>
    );
});
