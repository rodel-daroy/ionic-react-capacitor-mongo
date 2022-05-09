import { IonSpinner } from '@ionic/react';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectCardsOnSale } from 'src/features/cards/cardsSlice';
import { StyledCardPriceStatistic, StyledPriceDiagramm } from './style';

interface IProps {
    metaCardId?: string;
}
export const CardPriceStatistic: React.FC<IProps> = (props: IProps) => {
    const { metaCardId } = props;
    const data = useSelector((state: RootState) => (metaCardId ? selectCardsOnSale(state, metaCardId) : undefined));
    const averagePrice = useMemo(() => 10, []);

    return (
        <StyledCardPriceStatistic>
            <h5>
                <FormattedMessage
                    defaultMessage="AV. Price"
                    description="Label of average Price in Price-Statistic section in Card-Details"
                />
                {averagePrice}
                <span>EUR</span>
            </h5>
            <PriceDiagramm data={data} />
        </StyledCardPriceStatistic>
    );
};

interface IPriceDiagrammProps {
    data: any;
}
const PriceDiagramm: React.FC<IPriceDiagrammProps> = ({ data: _data }: IPriceDiagrammProps) => (
    <StyledPriceDiagramm>
        <IonSpinner />
    </StyledPriceDiagramm>
);
