import { useCallback, useState } from 'react';
import { IQuickFilterProps } from '../QuickFilter';

interface IQuickFilterGroup {
    title: string;
    items: Array<Pick<IQuickFilterProps, 'label' | 'filterColumn' | 'filterValue'>>;
}
export const useQuickFilterGroups = (zoneId?: string): IQuickFilterGroup[] => {
    const [quickFilterGroups, setQuickFilterGroups] = useState(new Map());

    const addQuickFilterGroup = useCallback(
        (zoneId?: string) => {
            const groups = getQuickFilterGroups(zoneId);
            setQuickFilterGroups(new Map(quickFilterGroups.set(zoneId, groups)));
            return groups;
        },
        [quickFilterGroups, setQuickFilterGroups],
    );

    return quickFilterGroups.has(zoneId) ? quickFilterGroups.get(zoneId) : addQuickFilterGroup(zoneId);
};

const getQuickFilterGroups = (zoneId?: string): IQuickFilterGroup[] => {
    switch (zoneId) {
        default:
            return [
                {
                    title: 'Rarity',
                    items: [
                        {
                            label: 'Common',
                            filterColumn: 'tier',
                            filterValue: 0,
                        },
                        {
                            label: 'Rare',
                            filterColumn: 'tier',
                            filterValue: 1,
                        },
                        {
                            label: 'Epic',
                            filterColumn: 'tier',
                            filterValue: 2,
                        },
                        {
                            label: 'Legendary',
                            filterColumn: 'tier',
                            filterValue: 3,
                        },
                        {
                            label: 'Special',
                            filterColumn: 'tier',
                            filterValue: 4,
                        },
                    ],
                },
                {
                    title: 'Player Role',
                    items: [
                        {
                            label: 'Mid-fielder',
                            filterColumn: 'cardStats',
                            filterValue: 'position.Midfielder',
                        },
                        {
                            label: 'Goalkeeper',
                            filterColumn: 'cardStats',
                            filterValue: 'position.Goalie',
                        },
                        {
                            label: 'Forward',
                            filterColumn: 'cardStats',
                            filterValue: 'position.Forward',
                        },
                        {
                            label: 'Defendant',
                            filterColumn: 'cardStats',
                            filterValue: 'position.Defense',
                        },
                        // {
                        //     label: 'Staff',
                        //     filterColumn: 'cardStats.position',
                        //     filterValue: '???',
                        // },
                    ],
                },
            ];
    }
};
