import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { TableInstance } from 'react-table';
import { RootState } from 'src/boot/types';
import { FilterSelect } from 'src/components';
import { selectMetaCardsByZoneId } from 'src/features/cards/cardsSlice';
import { selectCurrentZone } from 'src/features/appData';
import { IMetaCard } from 'src/features/cards/types';

const ALL_TEAMS = {
    name: 'All Teams',
    id: '',
};

interface IProps {
    setFilter: TableInstance<IMetaCard>['setFilter'];
    currentValue: string | undefined;
}
export const TeamFilter: React.FC<IProps> = ({ setFilter, currentValue }: IProps) => {
    const intl = useIntl();
    const currentZone = useSelector(selectCurrentZone);
    const metaCards = useSelector((state: RootState) => selectMetaCardsByZoneId(state, currentZone?._id));
    const [showTeamsFilter, setShowTeamsFilter] = useState<boolean>();

    // TODO: Show this filter only if currentZone is a Football zone!
    const teams = useMemo(
        () => [
            ALL_TEAMS,
            ...Array.from(
                new Set(metaCards.map(({ cardStats }) => cardStats.find(({ name }) => name === 'jersey')?.value)),
            )
                .filter(Boolean)
                .map((team) => ({
                    name: team!,
                    id: team!,
                })),
        ],
        [metaCards],
    );

    useEffect(() => {
        const isVisible = teams && teams.length > 1;
        if (isVisible === showTeamsFilter) return;
        setShowTeamsFilter(Boolean(isVisible));
    }, [teams, showTeamsFilter]);

    const handleChange = useCallback(
        ({ id }: { id: string }) => {
            if (!id) return setFilter('cardStats', undefined);
            setFilter('cardStats', `jersey.${id}`);
        },
        [setFilter],
    );

    const val = useMemo(() => teams.find((c) => c.id && currentValue && currentValue.includes(c.id)) || teams[0], [
        currentValue,
        teams,
    ]);
    return showTeamsFilter ? (
        <FilterSelect
            label={intl.formatMessage({ defaultMessage: 'Team', description: 'Label for Team-Filter' })}
            options={teams}
            initialValue={teams[0]}
            value={val}
            onChange={handleChange}
        />
    ) : null;
};
