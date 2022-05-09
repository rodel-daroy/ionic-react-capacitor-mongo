import { CheckboxChangeEventDetail } from '@ionic/core';
import { IonCheckbox, IonLabel } from '@ionic/react';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectCurrentZone } from 'src/features/appData';
import { IMetaCard } from 'src/features/cards/types';
import { QuickFilter } from '../QuickFilter';
import { SetAllFilters, SetFilter } from '../types';
import { CategoryFilter } from './CategoryFilter';
import { EditionFilter } from './EditionFilter';
import { SetFilters } from './SetFilters';
import {
    StyledQuickFilterGroup,
    StyledQuickFilterGroupTitle,
    StyledClose,
    StyledHeader,
    StyledTitle,
    StyledWrapper,
    StyledSelectFilters,
    StyledContent,
    StyledReset,
    StyledItem,
    StyledButton,
    StyledFooter,
} from './style';
import { TeamFilter } from './TeamFilter';
import { useQuickFilterGroups } from './useQuickFilterGroups';

interface IProps {
    filters: any;
    isOpen: boolean;
    onClose: () => void;
    setFilter: SetFilter;
    setAllFilters: SetAllFilters;
    getFilter: <K extends keyof IMetaCard>(filter: K | [K, keyof IMetaCard[K]]) => IMetaCard[K] | any | undefined;
}
export const FullFilter: React.FC<IProps> = ({
    onClose,
    filters,
    isOpen,
    getFilter,
    setFilter,
    ...methods
}: IProps) => {
    const currentZone = useSelector(selectCurrentZone);
    const quickFilterGroups = useQuickFilterGroups(currentZone?._id);

    const renderedSelectFilters = useMemo(
        () => (
            <StyledSelectFilters>
                <TeamFilter currentValue={(getFilter('cardStats') as unknown) as string} setFilter={setFilter} />
                <EditionFilter currentValue={getFilter('edition')} setFilter={setFilter} />
                <CategoryFilter
                    currentValue={getFilter('editionCategory')}
                    currentEdition={getFilter('edition')}
                    setFilter={setFilter}
                />
                <SetFilters
                    currentValue={getFilter('editionSet')}
                    currentEdition={getFilter('edition')}
                    currentCategory={getFilter('editionCategory')}
                    setFilter={setFilter}
                />
            </StyledSelectFilters>
        ),
        // We want to update on changes of 'filter'
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [getFilter, setFilter, filters],
    );

    const renderedQuickFilterGroups = useMemo(
        () =>
            quickFilterGroups.map((group, i) => (
                <StyledQuickFilterGroup key={i}>
                    <StyledQuickFilterGroupTitle>{group.title}</StyledQuickFilterGroupTitle>
                    {group.items.map((filter) => (
                        <QuickFilter
                            key={`${String(filter.filterColumn)}.${String(filter.filterValue)}`}
                            {...filter}
                            currentValue={getFilter(filter.filterColumn)}
                            setFilter={setFilter}
                            {...methods}
                        />
                    ))}
                </StyledQuickFilterGroup>
            )),
        [methods, getFilter, setFilter, quickFilterGroups],
    );

    const handleReset = useCallback(() => methods.setAllFilters([]), [methods]);

    const setOwnedFilter = useCallback(
        (e: CustomEvent<CheckboxChangeEventDetail>) => {
            setFilter('userSpecificFields', (prev) => {
                const newValue = e.detail.checked;
                if (newValue) return { ...(prev || {}), owned: newValue };
                else {
                    if (!prev) return undefined;
                    const newVal = Object.assign({}, prev);
                    delete newVal.owned;
                    return Object.keys(prev) ? prev : undefined;
                }
            });
        },
        [setFilter],
    );

    return (
        <StyledWrapper isOpen={isOpen}>
            <StyledHeader>
                <StyledTitle>
                    <FormattedMessage defaultMessage="Select" description="Title for filter modal" />
                </StyledTitle>
                <StyledClose onClick={onClose}>
                    <FormattedMessage defaultMessage="close" description="Label for filter modal close button" />
                </StyledClose>
            </StyledHeader>
            <StyledContent>
                {renderedSelectFilters}
                {renderedQuickFilterGroups}
                <StyledItem mode="ios">
                    <IonCheckbox
                        slot="start"
                        onIonChange={setOwnedFilter}
                        checked={getFilter(['userSpecificFields', 'owned'])}
                    />
                    <IonLabel>
                        <FormattedMessage
                            defaultMessage="Show only owned cards"
                            description="Label for Filter: Show only owned cards"
                        />
                    </IonLabel>
                </StyledItem>
            </StyledContent>
            <StyledFooter>
                <StyledButton onClick={onClose} expand="block">
                    <FormattedMessage defaultMessage="Confirm" description="Confirm-button label" />
                </StyledButton>
                <StyledReset onClick={handleReset}>
                    <FormattedMessage defaultMessage="Reset all" description="Reset-All button label" />
                </StyledReset>
            </StyledFooter>
        </StyledWrapper>
    );
};
