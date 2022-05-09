import React, { useCallback, useMemo, useState } from 'react';
import { StyledSlide, StyledSlideHeader, List, ListItem, ListItemImage, ListItemLabel, StyledCheckbox } from './styles';

import dfb1 from 'src/assets/images/Onboarding_Slides/DFB1.png';
import dfb2 from 'src/assets/images/Onboarding_Slides/DFB2.png';
import dfb3 from 'src/assets/images/Onboarding_Slides/DFB3.png';
import { IonRippleEffect } from '@ionic/react';

const list = [
    { _id: '1', name: "Men's National Team", image: dfb1 },
    { _id: '2', name: "Woman's National Team", image: dfb3 },
    { _id: '3', name: 'Under 21 National Team', image: dfb2 },
];

export const Slide3: React.FC = () => {
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    const updateItem = useCallback(
        (itemId: string) => {
            if (selectedTeams.includes(itemId)) {
                setSelectedTeams(selectedTeams.filter((id) => id !== itemId));
            } else {
                setSelectedTeams([...selectedTeams, itemId]);
            }
        },
        [selectedTeams],
    );

    const renderItems = useMemo(() => {
        return list.map(({ _id, name, image }, i) => (
            <ListItem
                key={i}
                onClick={() => updateItem(_id)}
                selected={selectedTeams.includes(_id)}
                className="ion-activatable ripple-parent"
            >
                <ListItemImage src={image}></ListItemImage>
                <ListItemLabel>{name}</ListItemLabel>
                <StyledCheckbox slot="end" value={name} checked={selectedTeams.includes(_id)} />
                <IonRippleEffect></IonRippleEffect>
            </ListItem>
        ));
    }, [selectedTeams, updateItem]);

    return (
        <StyledSlide>
            <StyledSlideHeader>Choose your favourite teams</StyledSlideHeader>
            <List>{renderItems}</List>
        </StyledSlide>
    );
};
