import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectMetaCardById } from 'src/features/cards/cardsSlice';
import { CardDetailsAccordion } from '../CardDetailsAccordion';
import { Wrapper } from './styles';
import { AccordionRow, AccordionLabel, AccordionValue } from '../CardDetailsAccordion/styles';

interface IProps {
    metaCardId: string;
}
export const CardDetailsAthlete: React.FC<IProps> = ({ metaCardId }: IProps) => {
    const metaCard = useSelector((state: RootState) => selectMetaCardById(state, metaCardId));

    return (
        <Wrapper>
            <CardDetailsAccordion title="Athlete's Information">
                {{
                    content() {
                        return metaCard ? (
                            <React.Fragment>
                                <AccordionRow>
                                    <AccordionLabel>Birth Date</AccordionLabel>
                                    <AccordionValue>TODO</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>HomeClube</AccordionLabel>
                                    <AccordionValue>TODO</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Market Value</AccordionLabel>
                                    <AccordionValue>TODO</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Games</AccordionLabel>
                                    <AccordionValue>TODO</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Goals</AccordionLabel>
                                    <AccordionValue>TODO</AccordionValue>
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
