import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectMetaCardById } from 'src/features/cards/cardsSlice';
import { CardDetailsAccordion } from '../CardDetailsAccordion';
import { Wrapper } from './styles';
import { AccordionRow, AccordionLabel, AccordionValue, AccordionGoldenBadge } from '../CardDetailsAccordion/styles';

interface IProps {
    metaCardId: string;
}
export const CardDetailsPrice: React.FC<IProps> = ({ metaCardId }: IProps) => {
    const metaCard = useSelector((state: RootState) => selectMetaCardById(state, metaCardId));
    return (
        <Wrapper>
            <CardDetailsAccordion title="Pricing">
                {{
                    content() {
                        return metaCard ? (
                            <React.Fragment>
                                <AccordionRow>
                                    <AccordionLabel>Av. Price</AccordionLabel>
                                    <AccordionGoldenBadge>{metaCard.priceAvg} IGC</AccordionGoldenBadge>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Best Price</AccordionLabel>
                                    <AccordionValue>{metaCard.priceMax} IGC</AccordionValue>
                                </AccordionRow>
                            </React.Fragment>
                        ) : (
                            <React.Fragment></React.Fragment>
                        );
                    },
                }}
            </CardDetailsAccordion>
        </Wrapper>
    );
};
