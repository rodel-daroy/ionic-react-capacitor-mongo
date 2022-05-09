import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { TableInstance } from 'react-table';
import { RootState } from 'src/boot/types';
import { FilterSelect } from 'src/components';
import { selectMetaCardsByZoneId } from 'src/features/cards/cardsSlice';
import { selectCurrentZone } from 'src/features/appData';
import { IMetaCard } from 'src/features/cards/types';

const CATEGORIES: { [key: string]: string[] } = {
    founders: ['Limitierte Anzahl'],
    onboarding: [],
    'Basic Edition': [
        'Kader (Common Cards)',
        'Die meisten Spiele und unsere Durchstarter',
        'Die besten Scorer',
        'Unsere Durchstarter',
        'Unsere All-Stars',
    ],
};

const ALL_CATEGORIES = {
    name: 'All Categories',
    id: '',
};

interface IProps {
    setFilter: TableInstance<IMetaCard>['setFilter'];
    currentEdition: string | undefined;
    currentValue: string | undefined;
}
export const CategoryFilter: React.FC<IProps> = ({ setFilter, currentEdition, currentValue }: IProps) => {
    const intl = useIntl();
    const currentZone = useSelector(selectCurrentZone);
    const metaCards = useSelector((state: RootState) => selectMetaCardsByZoneId(state, currentZone?._id));
    const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>();

    const categories = useMemo(
        () => [
            ALL_CATEGORIES,
            ...Array.from(new Set(metaCards.map(({ editionCategory }) => editionCategory)))
                .filter((category) => {
                    if (!currentEdition) return false;
                    if (currentEdition === 'Sample') return true;
                    // eslint-disable-next-line security/detect-object-injection
                    return CATEGORIES[currentEdition] && CATEGORIES[currentEdition].includes(category);
                })
                .map((category) => ({
                    name: category,
                    id: category,
                })),
        ],
        [currentEdition, metaCards],
    );

    useEffect(() => {
        const isVisible = currentEdition && categories && categories.length > 1;
        setShowCategoryFilter(Boolean(isVisible));
    }, [categories, currentEdition]);

    const handleChange = useCallback(
        ({ id }: { id: string }) => {
            setFilter('editionCategory', id);
            setFilter('editionSet', undefined);
        },
        [setFilter],
    );

    return showCategoryFilter ? (
        <FilterSelect
            label={intl.formatMessage({ defaultMessage: 'Category', description: 'Label for Category-Filter' })}
            options={categories}
            initialValue={categories[0]}
            value={categories.find((c) => c.id === currentValue) || categories[0]}
            onChange={handleChange}
        />
    ) : null;
};
