import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { TableInstance } from 'react-table';
import { RootState } from 'src/boot/types';
import { FilterSelect } from 'src/components';
import { selectMetaCardsByZoneId } from 'src/features/cards/cardsSlice';
import { selectCurrentZone } from 'src/features/appData';
import { IMetaCard } from 'src/features/cards/types';

const SETS: { [editionOrCategory: string]: string[] } = {
    // Editions
    founders: ['Die Mannschaft', 'Frauen-Nationalmannschaft', 'U21-Nationalmannschaft'],
    onboarding: ['Die Mannschaft', 'Frauen-Nationalmannschaft', 'U21-Nationalmannschaft'],
    basis: [],

    // Categories
    'Limitierte Anzahl': ['Die Mannschaft', 'Frauen-Nationalmannschaft', 'U21-Nationalmannschaft'],
    'Kader (Common Cards)': ['Die Mannschaft', 'Frauen-Nationalmannschaft', 'U21-Nationalmannschaft'],
    'Die meisten Spiele und unsere Durchstarter': [
        'Die Mannschaft',
        'Frauen-Nationalmannschaft',
        'U21-Nationalmannschaft',
    ],
    'Unsere Durchstarter': ['Die meisten Spiele', 'Durchstarter'],
    'Die besten Scorer': ['Die meisten Tore', 'Die meisten Vorlagen', 'Am häufigsten "zu Null"'],
    'Unsere All-Stars': ['Die Mannschaft', 'Frauen-Nationalmannschaft', 'U21-Nationalmannschaft'],
};

const ALL_SETS = {
    name: 'All Sets',
    id: '',
};
interface IProps {
    setFilter: TableInstance<IMetaCard>['setFilter'];
    currentValue: string | undefined;
    currentEdition: string | undefined;
    currentCategory: string | undefined;
}
export const SetFilters: React.FC<IProps> = (props: IProps) => {
    const intl = useIntl();
    const { currentEdition, currentCategory, currentValue, setFilter } = props;
    const currentZone = useSelector(selectCurrentZone);
    const metaCards = useSelector((state: RootState) => selectMetaCardsByZoneId(state, currentZone?._id));
    const [showSetFilter, setShowSetFilter] = useState<boolean>();

    const sets = useMemo(
        () => [
            ALL_SETS,
            ...Array.from(new Set(metaCards.map(({ editionSet }) => editionSet)))
                .filter((set) => {
                    if (!currentCategory || !currentEdition) return false;
                    if (currentEdition === 'Sample') return true;
                    return (
                        // eslint-disable-next-line security/detect-object-injection
                        (SETS[currentEdition] && SETS[currentEdition].includes(set)) ||
                        // eslint-disable-next-line security/detect-object-injection
                        (SETS[currentCategory] && SETS[currentCategory].includes(set))
                    );
                })
                .map((category) => ({
                    name: category,
                    id: category,
                })),
        ],
        [currentCategory, currentEdition, metaCards],
    );

    useEffect(() => {
        const isVisible = currentCategory && sets && sets.length > 1;
        setShowSetFilter(Boolean(isVisible));
    }, [sets, currentCategory]);

    const handleChange = useCallback(
        ({ id }: { id: string }) => {
            setFilter('editionSet', id);
        },
        [setFilter],
    );

    return showSetFilter ? (
        <FilterSelect
            label={intl.formatMessage({ defaultMessage: 'Set', description: 'Label for Set-Filter' })}
            options={sets}
            initialValue={sets[0]}
            value={sets.find((c) => c.id === currentValue) || sets[0]}
            onChange={handleChange}
        />
    ) : null;
};
