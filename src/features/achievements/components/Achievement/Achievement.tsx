import { checkmark } from 'ionicons/icons';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { useTranslation } from 'src/hooks';
import { selectAchievementById } from '../../achievementsSlice';
import { StyledWrapper, StyledIconWrapper, StyledIcon, StyledRewards, StyledTitle } from './style';

interface IProps {
    achievementId: string;
}
export const Achievement: React.FC<IProps> = React.memo(function Achievement({ achievementId }: IProps) {
    const achievement = useSelector((state: RootState) => selectAchievementById(state, achievementId));

    const { getTranslation } = useTranslation(achievement);
    const title = getTranslation('title');
    const rewards = useMemo(() => {
        const rewards = [] as string[];
        const pointReward = achievement?.rewards.find(({ type }) => type === 'POINTS');
        if (pointReward) rewards.push(`${pointReward.value} Points`);

        const gameCoinReward = achievement?.rewards.find(({ type }) => type === 'IGC');
        if (gameCoinReward) rewards.push(`${gameCoinReward.value} FZC`);

        return rewards.join(' + ');
    }, [achievement]);

    return achievement ? (
        <StyledWrapper>
            <StyledIconWrapper completed={achievement.completed}>
                <StyledIcon icon={checkmark} />
            </StyledIconWrapper>
            <StyledRewards>{rewards}</StyledRewards>
            <StyledTitle>{title || `No Translations for achiev. ${String(achievement._id)}`}</StyledTitle>
        </StyledWrapper>
    ) : null;
});
