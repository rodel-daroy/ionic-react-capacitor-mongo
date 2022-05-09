import { IonIcon } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import React from 'react';
import { IMetaCard } from 'src/features/cards/types';
import { QuickFilter } from '../QuickFilter';
import { SetAllFilters, SetFilter } from '../types';
import { StyledQuickFilters } from './style';

export interface IQuickFilters {
    favorites?: boolean;
    ownedCardsOnSale?: boolean;
    myCards?: boolean;
}
interface IQuickFilterProps extends IQuickFilters {
    setFilter: SetFilter;
    setAllFilters: SetAllFilters;
    getFilter: <K extends keyof IMetaCard>(filter: K | [K, keyof IMetaCard[K]]) => IMetaCard[K] | any | undefined;
}
export const QuickFilters: React.FC<IQuickFilterProps> = React.memo(function QuickFilters(props: IQuickFilterProps) {
    const { favorites, ownedCardsOnSale, myCards, getFilter, ...methods } = props;

    return (
        <StyledQuickFilters>
            {myCards && (
                <QuickFilter
                    {...methods}
                    currentValue={getFilter(['userSpecificFields', 'owned'])}
                    mode="dark"
                    label="My Cards"
                    filterColumn="userSpecificFields"
                    filterValue={{ field: 'owned', value: true }}
                />
            )}
            {ownedCardsOnSale && (
                <QuickFilter
                    {...methods}
                    currentValue={getFilter(['userSpecificFields', 'onSaleByMe'])}
                    mode="dark"
                    label="My Listings"
                    filterColumn="userSpecificFields"
                    filterValue={{ field: 'onSaleByMe', value: true }}
                />
            )}
            {favorites && (
                <QuickFilter
                    {...methods}
                    currentValue={getFilter(['userSpecificFields', 'bookmarked'])}
                    mode="dark"
                    label="My Favorites"
                    filterColumn="userSpecificFields"
                    filterValue={{ field: 'bookmarked', value: true }}
                >
                    <IonIcon
                        size="large"
                        icon={getFilter(['userSpecificFields', 'bookmarked']) ? heart : heartOutline}
                    />
                </QuickFilter>
            )}
        </StyledQuickFilters>
    );
});
