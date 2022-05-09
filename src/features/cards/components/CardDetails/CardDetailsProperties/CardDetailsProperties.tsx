import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectMetaCardById } from 'src/features/cards/cardsSlice';
import { CardDetailsAccordion } from '../CardDetailsAccordion';
import { Wrapper } from './styles';
import { AccordionRow, AccordionLabel, AccordionValue, AccordionBadge } from '../CardDetailsAccordion/styles';

const TIERS = new Map([
    [0, 'Common'],
    [1, 'Rare'],
    [2, 'Epic'],
    [3, 'Legendary'],
    [4, 'Special'],
]);
interface IProps {
    metaCardId: string;
}
export const CardDetailsProperties: React.FC<IProps> = ({ metaCardId }: IProps) => {
    const metaCard = useSelector((state: RootState) => selectMetaCardById(state, metaCardId));

    return (
        <Wrapper>
            <CardDetailsAccordion title="Properties">
                {{
                    content() {
                        return metaCard ? (
                            <React.Fragment>
                                <AccordionRow>
                                    <AccordionLabel>Rarity</AccordionLabel>
                                    <AccordionBadge>{TIERS.get(metaCard.tier) || 'unknown'}</AccordionBadge>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Score</AccordionLabel>
                                    <AccordionValue>0</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Circulating</AccordionLabel>
                                    <AccordionValue>{metaCard.amount}</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Zone</AccordionLabel>
                                    <AccordionValue>
                                        {metaCard.zones.find((zone) => zone.rank === 0)?.name}
                                    </AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>League</AccordionLabel>
                                    <AccordionValue>
                                        {metaCard.zones.find((zone) => zone.rank === 1)?.name}
                                    </AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Edition</AccordionLabel>
                                    <AccordionValue>{metaCard.edition}</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Category</AccordionLabel>
                                    <AccordionValue>{metaCard.editionCategory}</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Set</AccordionLabel>
                                    <AccordionValue>{metaCard.editionSet}</AccordionValue>
                                </AccordionRow>
                                <AccordionRow>
                                    <AccordionLabel>Team</AccordionLabel>
                                    <AccordionValue>
                                        {metaCard.cardStats.find((stat) => stat.name === 'jersey')?.value}
                                    </AccordionValue>
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
