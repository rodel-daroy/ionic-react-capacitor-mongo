import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { TableInstance } from 'react-table';
import { RootState } from 'src/boot/types';
import { FilterSelect } from 'src/components';
import { selectCurrentZone } from 'src/features/appData';
import { selectMetaCardsByZoneId } from 'src/features/cards/cardsSlice';
import { IMetaCard } from 'src/features/cards/types';

const ALL_EDITIONS = {
    name: 'All Editions',
    id: '',
};

interface IProps {
    setFilter: TableInstance<IMetaCard>['setFilter'];
    currentValue: string | undefined;
}
export const EditionFilter: React.FC<IProps> = ({ setFilter, currentValue }: IProps) => {
    const intl = useIntl();
    const currentZone = useSelector(selectCurrentZone);
    const metaCards = useSelector((state: RootState) => selectMetaCardsByZoneId(state, currentZone?._id));

    const editions = useMemo(
        () => [
            ALL_EDITIONS,
            ...Array.from(new Set(metaCards.map(({ edition }) => edition))).map((edition) => ({
                name: edition,
                id: edition,
            })),
        ],
        [metaCards],
    );

    const handleChange = useCallback(
        ({ id }: { id: string }) => {
            setFilter('edition', id);
            setFilter('editionCategory', undefined);
            setFilter('editionSet', undefined);
        },
        [setFilter],
    );

    return (
        <FilterSelect
            label={intl.formatMessage({ defaultMessage: 'Edition', description: 'Label for Edition-Filter' })}
            options={editions}
            initialValue={editions[0]}
            value={editions.find((e) => e.id === currentValue) || editions[0]}
            onChange={handleChange}
        />
    );
};
