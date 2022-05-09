import { filter } from 'ionicons/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Column, DefaultFilterTypes, Row, useFilters, useTable } from 'react-table';
import { RootState } from 'src/boot/types';
import { selectCurrentZone } from 'src/features/appData';
import { selectMetaCardsByZoneId } from 'src/features/cards/cardsSlice';
import { IMetaCard } from 'src/features/cards/types';
import { FullFilter } from './FullFilter';
import { IQuickFilters, QuickFilters } from './QuickFilters';
import { StyledFilters, StyledTrigger, StyledWrapper } from './style';
import { INestedValue } from './types';

const filterCardStats = (rows: Row<IMetaCard>[], columnIds: string[], filterValue: string) => {
    return rows.filter((row) => {
        const stats = row.values.cardStats as IMetaCard['cardStats'];
        const [n, v] = filterValue.split('.');
        return stats.some(({ name, value }) => name === n && value === v);
    });
};

const filterUserSpecificFields = (
    rows: Row<IMetaCard>[],
    columnIds: string[],
    filterValue: INestedValue<'userSpecificFields'>,
) => {
    return rows.filter((row) => {
        const fields = row.values.userSpecificFields as IMetaCard['userSpecificFields'];
        const keys = (Object.keys(filterValue) as unknown) as Array<keyof typeof fields>;
        // eslint-disable-next-line security/detect-object-injection
        return keys.every((key) => fields[key] === filterValue[key]);
    });
};

const getFilterType = (
    columnName: keyof IMetaCard,
): ((rows: Row<IMetaCard>[], columnIds: string[], filterValue: any) => Row<IMetaCard>[]) | DefaultFilterTypes => {
    switch (columnName) {
        case 'cardStats': {
            return filterCardStats;
        }
        case 'userSpecificFields': {
            return filterUserSpecificFields;
        }
        case 'tier':
            return 'equals';
        default:
            return 'text';
    }
};

interface ICardsFilter {
    CardsFilter: React.ReactNode;
    filterResult: {
        metaCardIds: string[];
    };
    isLoading: boolean;
    resetFilters: () => void;
}

interface IOptions {
    quickFilters?: IQuickFilters;
}
export const useCardsFilter = ({ quickFilters }: IOptions = {}): ICardsFilter => {
    const [isLoading, setIsLoading] = useState(true);
    const [filterResult, setFilterResult] = useState({ metaCardIds: [] } as ICardsFilter['filterResult']);

    const currentZone = useSelector(selectCurrentZone);
    const metaCards = useSelector((state: RootState) => selectMetaCardsByZoneId(state, currentZone?._id));

    const columns = useMemo(() => {
        const metaCardColumns = Array.from(new Set(metaCards.map((metaCard) => Object.keys(metaCard)).flat()));
        return metaCardColumns.map((c) => ({
            accessor: c,
            filter: getFilterType(c as keyof IMetaCard),
        })) as Column<IMetaCard>[];
    }, [metaCards]);

    const { rows, setFilter, setAllFilters, state } = useTable<IMetaCard>({ columns, data: metaCards }, useFilters);

    const resetFilters = useCallback(() => setAllFilters([]), [setAllFilters]);
    const hasFilters = useMemo(() => state.filters.length > 0, [state.filters]);

    const getFilter = useCallback(
        <K extends keyof IMetaCard>(filterName: K | [K, keyof IMetaCard[K]]) => {
            if (Array.isArray(filterName)) {
                const [key, fieldName] = filterName;
                const rootField = state.filters.find((f) => f.id === key)?.value as IMetaCard[K];
                if (rootField && fieldName in rootField) {
                    // @ts-ignore
                    // eslint-disable-next-line security/detect-object-injection
                    return rootField[fieldName];
                }
                return undefined;
            }
            return state.filters.find((f) => f.id === filterName)?.value as IMetaCard[K];
        },
        [state],
    );
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const showFilter = useCallback(() => setIsFilterVisible(true), [setIsFilterVisible]);
    const hideFilter = useCallback(() => setIsFilterVisible(false), [setIsFilterVisible]);

    const CardsFilter = useMemo(
        () =>
            columns.length ? (
                <StyledWrapper>
                    <StyledFilters>
                        <QuickFilters
                            {...quickFilters}
                            setFilter={setFilter}
                            setAllFilters={setAllFilters}
                            getFilter={getFilter}
                        />
                        <StyledTrigger isActive={hasFilters} icon={filter} onClick={showFilter} />
                    </StyledFilters>

                    <FullFilter
                        filters={state.filters}
                        isOpen={isFilterVisible}
                        onClose={hideFilter}
                        setFilter={setFilter}
                        setAllFilters={setAllFilters}
                        getFilter={getFilter}
                    />
                </StyledWrapper>
            ) : null,
        [
            columns.length,
            quickFilters,
            setFilter,
            setAllFilters,
            getFilter,
            hasFilters,
            showFilter,
            state.filters,
            isFilterVisible,
            hideFilter,
        ],
    );

    useEffect(() => {
        if (rows.length) setIsLoading(false);
        const metaCardIds = rows
            .sort((a, b) => (a.values.title as string).localeCompare(b.values.title))
            .map(({ values: { _id } }) => _id as string);
        setFilterResult((prev) => ({ ...prev, metaCardIds }));
    }, [columns, rows, setFilter, state]);

    return {
        CardsFilter,
        filterResult,
        isLoading,
        resetFilters,
    };
};
