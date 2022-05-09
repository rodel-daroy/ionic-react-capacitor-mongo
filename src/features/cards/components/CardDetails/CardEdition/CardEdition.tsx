import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectMetaCardById } from 'src/features/cards/cardsSlice';
import { StyledCardEdition } from './style';

interface IProps {
    metaCardId?: string;
}
export const CardEdition: React.FC<IProps> = ({ metaCardId }: IProps) => {
    const edition = useSelector((state: RootState) =>
        metaCardId ? selectMetaCardById(state, metaCardId)?.edition : '',
    );

    return (
        <StyledCardEdition>
            <h4>
                <FormattedMessage defaultMessage="Basic Edition" description="Edition Title in Card-Details view" />
            </h4>
            <h2>{edition}</h2>
        </StyledCardEdition>
    );
};
