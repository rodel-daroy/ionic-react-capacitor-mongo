import React from 'react';
import { CardDetailsSlider } from './CardDetailsSlider';

export interface IOpenPackCardProps {
    cardIds: string[];
}

export const CardDetailsCollectOpenPack: React.FC<IOpenPackCardProps> = (props: IOpenPackCardProps) => {
    const { cardIds } = props;

    return <CardDetailsSlider cardIds={cardIds}></CardDetailsSlider>;
};
