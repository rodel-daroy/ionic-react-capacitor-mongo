import { isPlainObject } from 'lodash';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { IMetaCard } from 'src/features/cards/types';
import { INestedField, SetAllFilters, SetFilter } from '../types';
import { StyledQuickFilter, StyledWrapper } from './style';

export interface IQuickFilterProps<K extends keyof IMetaCard = any> {
    label: string;
    filterColumn: K;
    filterValue: IMetaCard[K] | INestedField<K>;
    currentValue: IMetaCard[K] | IMetaCard[K][keyof IMetaCard[K]];
    resetOtherFilters?: boolean;
    mode?: 'light' | 'dark';
    setFilter: SetFilter;
    setAllFilters: SetAllFilters;
    children?: ReactNode;
}
export const QuickFilter = <K extends keyof IMetaCard>({
    filterColumn,
    filterValue,
    children,
    currentValue,
    label,
    mode,
    resetOtherFilters,
    setFilter,
    setAllFilters,
}: IQuickFilterProps<K>): JSX.Element => {
    const isNestedFilter = useMemo(() => isPlainObject(filterValue), [filterValue]);

    const isActive = useMemo(() => {
        if (typeof currentValue === 'undefined') return false;
        if (isPlainObject(filterValue)) {
            const { value } = filterValue as INestedField<K>;
            return currentValue === value;
        } else {
            return currentValue === filterValue;
        }
    }, [currentValue, filterValue]);

    const handleClick = useCallback(() => {
        if (resetOtherFilters) setAllFilters([]);
        setFilter(filterColumn, (prev) => {
            if (!isNestedFilter) return isActive ? undefined : (filterValue as IMetaCard[K]);

            const { field, value } = filterValue as INestedField<K>;
            if (isActive && isPlainObject(prev)) {
                // @ts-ignore
                // eslint-disable-next-line security/detect-object-injection
                delete (prev as Record<string, any>)[field];
                return Object.keys(prev as Record<string, any>).length ? prev : undefined;
            }
            // @ts-ignore
            return { ...(prev || {}), [field]: value };
        });
    }, [resetOtherFilters, setAllFilters, isNestedFilter, setFilter, filterColumn, isActive, filterValue]);

    return children ? (
        <StyledWrapper onClick={handleClick}>{children}</StyledWrapper>
    ) : (
        <StyledQuickFilter mode={mode || 'light'} isActive={!!isActive} onClick={handleClick}>
            {label}
        </StyledQuickFilter>
    );
};
