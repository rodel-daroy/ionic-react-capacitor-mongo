import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CardPerformanceStatistic } from './CardPerformanceStatistic';
import { CardPriceStatistic } from './CardPriceStatistic';
import { StyledCardStatistics } from './style';

interface IProps {
    cardId?: string;
    metaCardId?: string;
}
export const CardStatistics: React.FC<IProps> = (props: IProps) => {
    const { cardId, metaCardId } = props;

    return (
        <StyledCardStatistics>
            <h4>
                <FormattedMessage
                    defaultMessage="Statistics"
                    description="Title of Statistics section in Card-Details"
                />
            </h4>
            <CardPriceStatistic metaCardId={metaCardId} />
            {cardId && <CardPerformanceStatistic cardId={cardId} />}
        </StyledCardStatistics>
    );
};
