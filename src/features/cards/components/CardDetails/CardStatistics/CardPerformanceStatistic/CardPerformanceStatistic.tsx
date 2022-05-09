import { IonSpinner } from '@ionic/react';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectCardById } from 'src/features/cards/cardsSlice';
import { StyledCardPerformanceStatistic, StyledPerformanceDiagramm } from './style';

interface IProps {
    cardId: string;
}
export const CardPerformanceStatistic: React.FC<IProps> = (props: IProps) => {
    const { cardId } = props;
    const card = useSelector((state: RootState) => selectCardById(state, cardId));
    const performanceScore = useMemo(() => 10, []);

    return (
        <StyledCardPerformanceStatistic>
            <h5>
                <FormattedMessage
                    defaultMessage="Performance"
                    description="Label of average Price in Price-Statistic section in Card-Details"
                />
                {performanceScore}
            </h5>
            <PriceDiagramm data={card} />
        </StyledCardPerformanceStatistic>
    );
};

interface IPriceDiagrammProps {
    data: any;
}
const PriceDiagramm: React.FC<IPriceDiagrammProps> = ({ data: _data }: IPriceDiagrammProps) => (
    <StyledPerformanceDiagramm>
        <IonSpinner />
    </StyledPerformanceDiagramm>
);
