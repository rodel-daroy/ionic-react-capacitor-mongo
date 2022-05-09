import { SelectChangeEventDetail } from '@ionic/core';
import { IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { StyledItem } from './style';

interface IOption {
    [key: string]: any;
    id: string;
    name: string;
}
interface IProps<D extends IOption = IOption> {
    onChange: (arg: D) => void;
    options: Array<D>;
    label: string;
    initialValue?: D;
    value: D;
}

export function FilterSelectUnmemoized<D extends IOption>({
    onChange,
    options,
    label,
    initialValue,
    value,
}: IProps<D>): ReactElement {
    const renderedOptions = useMemo(
        () =>
            options.map((o) => (
                <IonSelectOption key={o.id} value={o}>
                    {o.name}
                </IonSelectOption>
            )),
        [options],
    );

    const handleChange = useCallback(
        (event: CustomEvent<SelectChangeEventDetail<D>>) => {
            onChange(event.detail.value);
        },
        [onChange],
    );

    /* Set initial valu if present */
    useEffect(() => {
        if (value || !initialValue) return;
        onChange(initialValue);
    }, [initialValue, value, onChange]);

    return (
        <StyledItem>
            <IonLabel>{label}</IonLabel>
            <IonSelect mode="ios" interface="alert" value={value} onIonChange={handleChange}>
                {renderedOptions}
            </IonSelect>
        </StyledItem>
    );
}
export const FilterSelect = React.memo(FilterSelectUnmemoized);
