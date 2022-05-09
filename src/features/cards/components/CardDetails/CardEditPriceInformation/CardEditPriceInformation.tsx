import { IonPicker } from '@ionic/react';
import React, { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectCardById } from 'src/features/cards/cardsSlice';
import { StyledCardPriceInformation } from './style';

interface IProps {
    cardId?: string;
    handlePriceChange: (newPrice: number) => void;
}
export const CardEditPriceInformation: React.FC<IProps> = ({ cardId, handlePriceChange }: IProps) => {
    const intl = useIntl();
    const currentValue = useSelector((state: RootState) => (cardId ? selectCardById(state, cardId)?.price : 0));
    const [value, setValue] = useState(currentValue || 0);
    const [isOpen, setIsOpen] = useState(false);

    const options = useMemo(() => {
        const MAX_PRICE = 100;
        const options = [];
        for (let i = 0; i < MAX_PRICE; i++) {
            options.push({ text: i.toString(), value: i, selected: i === value });
        }
        return options;
    }, [value]);

    return (
        <StyledCardPriceInformation onClick={() => setIsOpen(true)}>
            <FormattedMessage description="Label of Price" defaultMessage="Your Price" />
            <span>{value} </span>
            <span>EUR</span>
            <IonPicker
                onDidDismiss={() => setIsOpen(false)}
                isOpen={isOpen}
                buttons={[
                    {
                        role: 'cancel',
                        text: intl.formatMessage({ defaultMessage: 'Cancel', description: 'Cancel-Button label' }),
                    },
                    {
                        text: intl.formatMessage({ defaultMessage: 'Confirm', description: 'Conrirm-Button label' }),
                        handler: ({ price }) => {
                            const v = (price as Record<string, any>).value;
                            setValue(v);
                            handlePriceChange(v);
                        },
                    },
                ]}
                columns={[{ name: 'price', options }]}
            />
        </StyledCardPriceInformation>
    );
};
