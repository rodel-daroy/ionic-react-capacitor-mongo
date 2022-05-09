import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { selectShopItemsByType } from 'src/features/shop/shopSlice';
import { ShopListItem } from './ShopListItem';
import { StyledShopList } from './styles';
import { RootState } from 'src/boot/types';

export const ShopList: React.FC = () => {
    const {
        params: { segment },
    } = useRouteMatch<{ segment: string }>();

    const shopItems = useSelector((state: RootState) => {
        const type = segment === 'tokens' ? 'TOKEN' : 'PACK';
        return selectShopItemsByType(state, type);
    });

    const renderedShopItems = useMemo(() => shopItems.map((item) => <ShopListItem key={item._id} shopItem={item} />), [
        shopItems,
    ]);

    return <StyledShopList>{renderedShopItems}</StyledShopList>;
};
